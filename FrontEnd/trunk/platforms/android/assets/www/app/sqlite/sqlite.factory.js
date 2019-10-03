/**
* SQLite service
* ThanhTN
* @2017
**/


(function () {
'use strict';


angular
	.module('FTravel.sqlite')
	.factory('DB', SQLiteFtr)
;

SQLiteFtr.$inject = [
	'$q', 'DB_CONFIG'
];

function SQLiteFtr(
	$q, DB_CONFIG
) {
    var self = this;
    self._db = null;

    self.init = function() {
        self._db = new Database('database-name', '1', null, !false);
        if(self._db) {
            self._db.setSchema(DB_CONFIG.tables, {
                onSuccess: function(scuuess) {
                    console.log(scuuess);
                },
                onError: function(err) {
                    console.log(err);
                }
            });
        }
        return self._db;

        // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
        self._db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);

        // Make sure everything is peachy
        if (!this._db) {
            throw new Error('Database: failed to open database named ' + this.name);
            return undefined;
        }

        angular.forEach(DB_CONFIG.tables, function(table) {
            var columns = [];

            angular.forEach(table.columns, function(column) {
                columns.push(column.name + ' ' + column.type);
            });

            var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
            self.query(query);
            console.log('Table ' + table.name + ' initialized');
        });
    };

    /**
     * Close the database connection
     *
     * Why you'd want to do this, I don't know; may as well support it, though
     */
    self.close = function() {
    	this._db.close();
    }

    // self.query = function(query, bindings) {
    //     bindings = typeof bindings !== 'undefined' ? bindings : [];
    //     var deferred = $q.defer();
    //
    //     self.db.transaction(function(transaction) {
    //         transaction.executeSql(query, bindings, function(transaction, result) {
    //             deferred.resolve(result);
    //         }, function(transaction, error) {
    //             deferred.reject(error);
    //         });
    //     });
    //
    //     return deferred.promise;
    // };

    // self.fetchAll = function(result) {
    //     var output = [];
    //
    //     for (var i = 0; i < result.rows.length; i++) {
    //         output.push(result.rows.item(i));
    //     }
    //
    //     return output;
    // };

    // self.fetch = function(result) {
    //     return result.rows.item(0);
    // };

    self.getTableByName = function(table_name) {
        var idx = DB_CONFIG.tables.indexOfPropertyValue('table', table_name);
        if(idx != -1) return DB_CONFIG.tables[idx];
    };

    self.dropTableAndCreate = function(table_name, options) {
        var table = self.getTableByName(table_name);

        self._db.query( self._db.getDropTable(table.table ), {
            onSuccess: function(scuuess) {
                self._db.query( self._db.getCreateTable(table.table, table.columns), options );
            },
            onError: function(err) {
                console.log(err);
            }
        } );

    };

    self.deleteRecord = function(table, id, options) {
        self._db.query( self._db.getDelete(table, { 'id': id }), options );
    };

    self.insertData = function(data, options) {
		if(data.drop) {
			var table = self.getTableByName(data.table);

	        self._db.query( self._db.getDropTable(table.table ), {
	            onSuccess: function(scuuess) {
	                self._db.query( self._db.getCreateTable(table.table, table.columns), {
						onSuccess: function() {
							self._db.insertData(data, options);
						},
						onError: function(err) {
                            console.log(err);
                        }
					} );
	            },
	            onError: function(err) {
	                console.log(err);
	            }
	        } );
		} else self._db.insertData(data, options);
    };

    self.update = function(table_name, data, where, options) {
        self._db.query( self._db.getUpdate(table_name, data, where), options);
    };

	self.getSelect = function(table_name, columns, where, paging, options) {
        self._db.query( self._db.getSelect(table_name, columns, where, paging), options);
    };

	self.insert = function(table_name, data) {
        // Check to see if it's a single table
    	if (!self._isArray(data)) data = [data];

    	// Merge in user options (if any) to defaults
    	// var options = (typeof options !== 'undefined' ? options : {});
    	// options = this._getOptions(options);
    	// Setup array to track queries
    	var dataQueries = [];
    	var length = data.length;
    	var table = null;
    	var i, j;
    	var insertsLength = 0;
    	var row = null;
    	for (i = 0; i < length; i++) {
    		table = data[i];
    		// Make sure there's actually a data array
    		if (typeof table.data !== 'undefined') {
    			// var tableName = table.table;
    			// Check to see if we have more than one row of data
    			var inserts = null;
    			if (!this._isArray(table.data)) {
    				inserts = [table.data]
    			} else {
    				inserts = table.data;
    			}
    			// Nested loop to fetch the data inserts
    			insertsLength = inserts.length;
    			for (j = 0; j < insertsLength; j++) {
    				row = inserts[j];
    				dataQueries.push(this.getInsert(table_name, row));
    			}
    		}
    	}
    	// Execute that sucker!
    	this.queries(dataQueries, options);
	};

    self.getInsert = function(tableName, data) {
    	var sql = 'INSERT INTO ' + tableName + ' (';
    	var valueString = ' VALUES (';
    	// Set up our tracker array for value placeholders
    	var colValues = [];
    	// Loop over the keys in our object
    	for (var key in data) {
    		// Add the value to the valueString
    		colValues.push(data[key]);
    		// Add the placeholders
    		sql += key;
    		valueString += '?';
    		// Append commas
    		sql += ', ';
    		valueString += ', ';
    	}
    	// Remove extra commas and insert closing parentheses
    	sql = sql.substr(0, sql.length - 2) + ')';
    	valueString = valueString.substr(0, valueString.length - 2) + ')';
    	// Put together the full SQL statement
    	sql += valueString;
    	// At long last, we've got our SQL; return it
    	return new DatabaseQuery({'sql': sql, 'values': colValues});
    };

    self.sreach = function(table_name, sreach_txt, sreach_cols, paging,options) {
        self._db.query( self._db.getSreach(table_name, sreach_txt, sreach_cols, paging), options );
    };

    self.query = function(sql, options) {
    	// Possible that the user closed the connection already, so double check
    	if (!this._db) {
    		this._db_lost();
    		return;
    	}
    	// Merge in user options (if any) to defaults
    	var options = (typeof options !== 'undefined' ? options : {});
    	// Check to see if they passed in a query object
    	if (typeof sql !== 'string') {
    		// Translate into options object and SQL string
    		options.values = sql.values;
    		sql = sql.sql;
    	}
    	// Run the actual merge for our options, making sure there's a default values array
    	options = this._getOptions(options, {"values": []});
    	// Trim whitespace to make sure we can accurately check character positions
    	sql = sql.replace(/(^\s*|\s*$)/g, '');
    	if (sql.lastIndexOf(';') !== sql.length - 1) {
    		sql = sql + ';';
    	}
    	// Run the transaction
    	var self = this;
    	this._db.transaction(function(transaction) {
    		if (self.debug) {
    			// Output the query to the log for debugging
    			console.log(sql, ' ==> ', options.values);
    		}
    		transaction.executeSql(sql, options.values, function(transaction, results) {
    			// We use this anonymous function to format the results
    			// Just passing the SQLResultSet object would require SQLite-specific code on the part of the callback

    			// Try to snag the last insert ID, if available
    			try {
    				self._lastInsertRowId = results.insertId;
    			} catch(e) {}
    			// Call the onSuccess with formatted results
    			if (options.onSuccess) {
    				options.onSuccess(self._convertResultSet(results));
    			}
    		}, options.onError);
    	});
    };

    /**
     * @protected
     * Detects if the variable is an array or not
     */
    self._isArray = function(testIt) {
    	return Object.prototype.toString.apply(it) === '[object Array]';
    };

    /** @protected */
    self._emptyFunction = function() {};

    /**
     * @protected
     * Used to report generic database errors
     */
    self._errorHandler = function(transaction, error) {
    	// If a transaction error (rather than an executeSQL error) there might only be one parameter
    	if (typeof error === 'undefined') {
    		var error = transaction;
    	}
    	if (console && console.log) {
    		console.log('Database error (' + error.code + '): ' + error.message);
    	}
    };

    /**
     * @protected
     * Merge user options into the standard set
     *
     * Parameters:
     * - userOptions (object, required): options passed by the user
     * - extraOptions (object, optional) any default options beyond onSuccess
     *   and onError
     */
    self._getOptions = function(userOptions, extraOptions) {
    	// var opts = {
    	// 	"onSuccess": this._emptyFunction,
    	// 	"onError": this.bound._errorHandler
    	// };
    	// if (typeof extraOptions !== 'undefined') {
    	// 	opts = this._mixin(opts, extraOptions);
    	// }
    	// if (typeof userOptions === 'undefined') {
    	// 	var userOptions = {};
    	// }
    	// return this._mixin(opts, userOptions);
    };

    /**
     * DatabaseQuery (object)
     *
     * This is a helper  that, at the moment, is basically just an object
     * with standard properties.
     *
     * Maybe down the road I'll add some helper methods for working with queries.
     *
     * USAGE:
     * var myQuery = new DatabaseQuery({
     *     sql: 'SELECT * FROM somewhere WHERE id = ?',
     *     values: ['someID']
     * });
     */
    var DatabaseQuery = function(inProps) {
    	this.sql = (typeof inProps.sql !== 'undefined' ? inProps.sql : '');
    	this.values = (typeof inProps.values !== 'undefined' ? inProps.values : []);
    };


    return self;
}
// Resource service example
// .factory('Document', function(DB) {
//     var self = this;
//
//     self.all = function() {
//         return DB.query('SELECT * FROM documents')
//         .then(function(result){
//             return DB.fetchAll(result);
//         });
//     };
//
//     self.getById = function(id) {
//         return DB.query('SELECT * FROM documents WHERE id = ?', [id])
//         .then(function(result){
//             return DB.fetch(result);
//         });
//     };
//
//     return self;
// })


})();
