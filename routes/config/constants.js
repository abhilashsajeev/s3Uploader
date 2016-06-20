var AWS = require('aws-sdk');

module.exports = {
  TABLECOLUMNS: {
    categoryName: 'Category',
    metaTitleName: 'Meta Title',
    metaDescriptionName: 'Meta Description',
    categoryIDName: 'Category ID '
  },
  AWSCONSTANTS: {
    s3ForcePathStyle: true,
    accessKeyId: 'ACCESS_KEY_ID',
    secretAccessKey: 'SECRET_ACCESS_KEY',
    endpoint: new AWS.Endpoint('http://10.4.3.60:4567'),
    sslEnabled: false
  },
  AWS_BUCKET_NAME: 'seometadata',
  MONGOOSE_URL: 'mongodb://localhost/my_database',
  UPLOAD_FOLDER:'./uploads/'
};
