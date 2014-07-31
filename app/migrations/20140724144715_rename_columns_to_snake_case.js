module.exports = {
  up: function(knex, Promise) {
    return Promise.all([
      knex.schema.table('categories', function (table) {
        table.renameColumn('ownerName', 'owner_name');
        table.renameColumn('ownerEmail', 'owner_email');
      }),
      knex.schema.table('data_previews', function (table) {
        table.renameColumn('previewUrl', 'preview_url');
        table.renameColumn('smallPreviewUrl', 'small_preview_url');
      }),
      knex.schema.table('data_sets', function (table) {
        table.renameColumn('vendorId', 'vendor_id');
        table.renameColumn('updateFrequency', 'update_frequency');
        table.renameColumn('startDate', 'start_date');
        table.renameColumn('lastUpdated','last_updated');
        table.renameColumn('remoteFile','remote_file');
        table.renameColumn('numColumns','num_columns');
        table.renameColumn('csvPreview','csv_preview');
      }),
      knex.schema.table('data_sets_categories', function (table) {
        table.renameColumn('dataSetId','data_set_id');
        table.renameColumn('categoryId','category_id');
      }),
      knex.schema.table('data_sets_data_previews', function (table) {
        table.renameColumn('dataSetId','data_set_id');
        table.renameColumn('dataPreviewId','data_preview_id');
      }),
      knex.schema.table('data_sets_data_tags', function (table) {
        table.renameColumn('dataSetId','data_set_id');
        table.renameColumn('dataTagId','data_tag_id');
      }),
      knex.schema.table('data_sets_users', function (table) {
        table.renameColumn('dataSetId','data_set_id');
        table.renameColumn('userId','user_id');
      }),
      knex.schema.table('notebooks', function (table) {
        table.renameColumn('projectId','project_id');
        table.renameColumn('userId','user_id');
        table.renameColumn('openedAt','opened_at');
      }),
      knex.schema.table('projects', function (table) {
        table.renameColumn('lastExecuted','last_executed');
        table.renameColumn('ownerId','owner_id');
        table.renameColumn('openedAt','opened_at');
      })
    ]);
  },

  down: function(knex, Promise) {
    return Promise.all([
      knex.schema.table('categories', function (table) {
        table.renameColumn('owner_name','ownerName');
        table.renameColumn('owner_email','ownerEmail');
      }),
      knex.schema.table('data_previews', function (table) {
        table.renameColumn('preview_url','previewUrl');
        table.renameColumn('small_preview_url','smallPreviewUrl');
      }),
      knex.schema.table('data_sets', function (table) {
        table.renameColumn('vendor_id','vendorId');
        table.renameColumn('update_frequency','updateFrequency');
        table.renameColumn('start_date','startDate');
        table.renameColumn('last_updated','lastUpdated');
        table.renameColumn('remote_file','remoteFile');
        table.renameColumn('num_columns','numColumns');
        table.renameColumn('csv_preview','csvPreview');
      }),
      knex.schema.table('data_sets_categories', function (table) {
        table.renameColumn('data_set_id','dataSetId');
        table.renameColumn('category_id','categoryId');
      }),
      knex.schema.table('data_sets_data_previews', function (table) {
        table.renameColumn('data_set_id','dataSetId');
        table.renameColumn('data_preview_id','dataPreviewId');
      }),
      knex.schema.table('data_sets_data_tags', function (table) {
        table.renameColumn('data_set_id','dataSetId');
        table.renameColumn('data_tag_id','dataTagId');
      }),
      knex.schema.table('data_sets_users', function (table) {
        table.renameColumn('data_set_id','dataSetId');
        table.renameColumn('user_id','userId');
      }),
      knex.schema.table('notebooks', function (table) {
        table.renameColumn('project_id','projectId');
        table.renameColumn('user_id','userId');
        table.renameColumn('opened_at','openedAt');
      }),
      knex.schema.table('projects', function (table) {
        table.renameColumn('last_executed','lastExecuted');
        table.renameColumn('owner_id','ownerId');
        table.renameColumn('opened_at','openedAt');
      })
    ]);
  }
}
