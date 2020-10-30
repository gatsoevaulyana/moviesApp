export default class MoviestoreService {

     data = [
        {
            id: 1, name: 'Book 1'
        },
        {
            id: 2, name: 'Book 2'
        }
    ];

    booksLoaded() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.data!==[]) {
                    resolve(this.data)
                }
                else {
                    reject(new Error('error'))
                }
            }, 700)
        })
    }
}