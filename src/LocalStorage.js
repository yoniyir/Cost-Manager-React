class LocalStorage {
    async setItem(key, value) {
        console.log('Async SetItem called');
        return new Promise((resolve, reject) => {
            try {
                localStorage.setItem(key, value);
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

    async getItem(key) {
        console.log('Async GetItem called');
        return new Promise((resolve, reject) => {
            try {
                const value = localStorage.getItem(key);
                resolve(value);
            } catch (err) {
                reject(err);
            }
        });
    }

}

export default new LocalStorage();
