'use strict';

exports.up = function (db, callback) {
  db.createTable('users', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    first_name: { type: 'string', length: 100, notNull: true },
    last_name: { type: 'string', length: 100, notNull: true },
    email: { type: 'string', length: 255, unique: true, notNull: true },
    password: { type: 'string', notNull: true },
    created_at: { type: 'timestamp', defaultValue: 'now()' }
  }, err => {
    if (err) return callback(err);

    db.createTable('categories', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      name: { type: 'string', length: 100, unique: true, notNull: true }
    }, err => {
      if (err) return callback(err);

      db.createTable('products', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        name: { type: 'string', length: 255, notNull: true },
        description: { type: 'text' },
        price: { type: 'decimal', notNull: true },
        category_id: {
          type: 'int',
          foreignKey: {
            name: 'product_category_fk',
            table: 'categories',
            rules: { onDelete: 'SET NULL' },
            mapping: { category_id: 'id' }
          }
        },
        created_at: { type: 'timestamp', defaultValue: 'now()' }
      }, err => {
        if (err) return callback(err);

        db.createTable('orders', {
          id: { type: 'int', primaryKey: true, autoIncrement: true },
          user_id: {
            type: 'int',
            foreignKey: {
              name: 'order_user_fk',
              table: 'users',
              rules: { onDelete: 'CASCADE' },
              mapping: { user_id: 'id' }
            }
          },
          status: { type: 'string', length: 50, defaultValue: 'active' },
          created_at: { type: 'timestamp', defaultValue: 'now()' }
        }, err => {
          if (err) return callback(err);

          db.createTable('order_products', {
            id: { type: 'int', primaryKey: true, autoIncrement: true },
            order_id: {
              type: 'int',
              foreignKey: {
                name: 'order_item_fk_order',
                table: 'orders',
                rules: { onDelete: 'CASCADE' },
                mapping: { order_id: 'id' }
              }
            },
            product_id: {
              type: 'int',
              foreignKey: {
                name: 'order_item_fk_product',
                table: 'products',
                rules: { onDelete: 'CASCADE' },
                mapping: { product_id: 'id' }
              }
            },
            quantity: { type: 'int', notNull: true }
          }, callback);
        });
      });
    });
  });
};

exports.down = function (db, callback) {
  db.dropTable('order_products', err => {
    if (err) return callback(err);

    db.dropTable('orders', err => {
      if (err) return callback(err);

      db.dropTable('products', err => {
        if (err) return callback(err);

        db.dropTable('categories', err => {
          if (err) return callback(err);

          db.dropTable('users', callback);
        });
      });
    });
  });
};
