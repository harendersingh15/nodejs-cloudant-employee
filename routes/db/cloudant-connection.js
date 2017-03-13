"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class CloudantConnection {
    constructor() {
        this.dbCredentials = {
            dbName: 'my_sample_db'
        };
        this.getDBCredentialsUrl = (jsonData) => {
            let vcapServices = JSON.parse(jsonData);
            for (let vcapService in vcapServices) {
                if (vcapService.match(/cloudant/i)) {
                    return vcapServices[vcapService][0].credentials.url;
                }
            }
        };
        this.initDBConnection = () => {
            //When running on Bluemix, this variable will be set to a json object
            //containing all the service credentials of all the bound services
            if (process.env.VCAP_SERVICES) {
                this.dbCredentials.url = this.getDBCredentialsUrl(process.env.VCAP_SERVICES);
            }
            else {
                this.dbCredentials.url = this.getDBCredentialsUrl(fs.readFileSync("vcap-local.json", "utf-8"));
            }
            this.cloudant = require('cloudant')(this.dbCredentials.url);
            // check if DB exists if not create
            this.cloudant.db.create(this.dbCredentials.dbName, (err, res) => {
                if (err) {
                    console.log('Could not create new db: ' + this.dbCredentials.dbName + ', it might already exist.');
                }
            });
            this.db = this.cloudant.use(this.dbCredentials.dbName);
        };
    }
}
exports.CloudantConnection = CloudantConnection;
//# sourceMappingURL=cloudant-connection.js.map