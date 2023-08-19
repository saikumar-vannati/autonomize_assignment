class Logger {

    static getInstance() {

        if (!this._instance) {
            this._instance = new Logger()
        }

        return this._instance
    }

    debug(message) {
        console.debug(`${new Date().toISOString()} | DEBUG | ${message}`)
    }

    info(message) {
        console.info(`${new Date().toISOString()} | INFO  | ${message}`)
    }

    error(errMsg) {
        console.error(`${new Date().toISOString()} | ERROR | ${errMsg}`)
    }
}


const logger = Logger.getInstance()

module.exports = logger
