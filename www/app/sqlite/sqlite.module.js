/*
 * SQLite module
 * Viettq
 * @2017
 */

(function() {
	"use strict";
  
  
	angular
	  .module("FTravel.sqlite", [])
	  .factory('DB', SQLiteFtr);
  
	SQLiteFtr.$inject = [
	  '$rootScope', '$http', '$q', '$window', 'Popup', '$ionicHistory',
	  'API', 'DB_CONFIG', 'API_CONST', 'LSFtr', '$ionicModal', '$cordovaSQLite'
	];
  
	function SQLiteFtr(
	  $rootScope, $http, $q, $window, Popup, $ionicHistory,
	  API, DB_CONFIG, API_CONST, LSFtr, $ionicModal, $cordovaSQLite
	) {
	  var self = this;
	  var _db;
  
	  self.db = function () {
		if (!_db) {
		  if (window.sqlitePlugin !== undefined) {
			_db = window.sqlitePlugin.openDatabase({ name: DB_CONFIG.name, location: 2, createFromLocation: 1 });
		  } else {
			// For debugging in the browser
			_db = window.openDatabase(DB_CONFIG.name, "1.0", "Database", 200000);
		  }
		}
		return _db;
	  };
  
	  self.getFirstItem = function (query, parameters) {
			  var deferred = $q.defer();
			  self.executeSql(query, parameters).then(function (res) {
  
				  if (res.rows.length > 0)
					  return deferred.resolve(res.rows.item(0));
				  else
					  return deferred.reject("There aren't items matching");
			  }, function (err) {
				  return deferred.reject(err);
			  });
  
			  return deferred.promise;
		  };
  
		  self.getFirstOrDefaultItem = function (query, parameters) {
			  var deferred = $q.defer();
			  self.executeSql(query, parameters).then(function (res) {
  
				  if (res.rows.length > 0)
					  return deferred.resolve(res.rows.item(0));
				  else
					  return deferred.resolve(null);
			  }, function (err) {
				  return deferred.reject(err);
			  });
  
			  return deferred.promise;
		  };
  
		  self.getItems = function (query, parameters) {
			  var deferred = $q.defer();
			  self.executeSql(query, parameters).then(function (res) {
				  var items = [];
				  for (var i = 0; i < res.rows.length; i++) {
					  items.push(res.rows.item(i));
				  }
				  return deferred.resolve(items);
			  }, function (err) {
				  return deferred.reject(err);
			  });
  
			  return deferred.promise;
		  };
  
		  self.executeSql = function (query, parameters) {
			  return $cordovaSQLite.execute(self.db(), query, parameters);
		  };
  
		  self.preloadDataBase = function (enableLog) {
			  var deferred = $q.defer();
  
			  //window.open("data:text/plain;charset=utf-8," + JSON.stringify({ data: window.queries.join('').replace(/\\n/g, '\n') }));
			  if (window.sqlitePlugin === undefined) {
				  if(enableLog) console.log('%c ***************** Starting the creation of the database in the browser ***************** ', 'background: #222; color: #bada55');
				  self.db().transaction(function (tx) {
					  for (var i = 0; i < window.queries.length; i++) {
						  var query = window.queries[i].replace(/\\n/g, '\n');
  
						  if(enableLog) console.log(window.queries[i]);
						  tx.executeSql(query);
					  }
				  }, function (error) {
					  deferred.reject(error);
				  }, function () {
					  if(enableLog) console.log('%c ***************** Completing the creation of the database in the browser ***************** ', 'background: #222; color: #bada55');
					  deferred.resolve("OK");
				  });
			  }
			  else {
				  deferred.resolve("OK");
			  }
  
			  return deferred.promise;
		  };
  
	  self.init = function() {
  
		angular.forEach(DB_CONFIG.tables, function(table) {
		  var columns = [];
  
		  angular.forEach(table.columns, function(column) {
			columns.push(column.name + ' ' + column.type);
		  });
		  var query1 = 'DROP TABLE IF EXISTS ' + table.name + ')';
		  self.query(query1);
  
		  var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
		//   var query ='DROP table IF EXISTS user';
		  self.query(query);
		  console.log('Table ' + table.name + ' initialized');
		});
	  };
  
	  self.query = function(query, bindings) {
		bindings = typeof bindings !== 'undefined' ? bindings : [];
		var deferred = $q.defer();
  
		self.db().transaction(function(transaction) {
		  transaction.executeSql(query, bindings, function(transaction, result) {
			deferred.resolve(result);
		  }, function(transaction, error) {
			deferred.reject(error);
		  });
		});
  
		return deferred.promise;
	  };
  
	  self.fetchAll = function(result) {
		var output = [];
  
		for (var i = 0; i < result.rows.length; i++) {
		  output.push(result.rows.item(i));
		}
  
		return output;
	  };
  
	  self.fetch = function(result) {
		if(typeof result.rows != 'undefined') {
		  if(result.rows.length > 0) {
			return result.rows.item(0);
		  } else {
			return null;
		  }
		} else
		  return null;
	  };
  
	  self.isExist = function(result) {
		if(result != null){
		  if(typeof result.rows != 'undefined') {
			if (result.rows.length > 0) {
			  return true;
			} 
		  } 
		}
		return false;
	  }
  
	  self.sqlInsert = function(tableName, data) {
		var sql = 'INSERT INTO ' + tableName + ' (';
		var valueString = ' VALUES (';
		// var colValues = [];
		for (var key in data) {
		  // colValues.push(data[key]);
		  sql += key;
		  valueString += '?';
		  sql += ', ';
		  valueString += ', ';
		}
		sql = sql.substr(0, sql.length - 2) + ')';
		valueString = valueString.substr(0, valueString.length - 2) + ')';
		sql += valueString;
		return sql;
	  };
  
	  self.insert = function(tableName, data) {
		var colValues = [];
		for (var key in data) {
		  colValues.push(data[key]);
		}
		return self.deleteData(tableName).then(function(result){
		  return self.select(tableName).then(function(result) {
			  if(!self.isExist(result)){
				var sql = self.sqlInsert(tableName, data);
				 self.query(sql, colValues).then(function(res) {
				   console.log('add success');
				}, function(err) {
				  console.error(err);
				});
			  }
		  }, function(err) {
			console.error(err);
		  });
		}, function(err) {
		  console.error(err);
		});
	  }
  
	  self.select = function(tableName) {
			  return self.query('SELECT * FROM ' + tableName)
		  .then(function(result) {
			return self.fetch(result);
		  },function(err){
			Popup.e(err);
		  });
	  };
  
	  self.deleteData = function(tableName) {
			  return self.select(tableName).then(function(result){
		  if(result != null) {
			return self.query('DELETE FROM ' + tableName + ' WHERE id = ?', [result.id])
			.then(function(rep){
			  return true;
			}, function(err) {
			  return false;
			});
		  }
			  }, function(err) {
		  return false;
		});
	  };
  
	  return self;
	}
  })();
  