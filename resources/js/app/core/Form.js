import Errors from './Errors';

export default class Form {
    /**
     * Create a new Form instance.
     *
     * @param {object} data
     */
    constructor(data) {
        this.open = false
        this.button = data.button
        this.name = data.name
        this.url = data.url
        this.requestType = data.requestType

        this.originalData = data.fields

        this.fields = {}

        for (let field in data.fields) {
            this.fields[field] = data.fields[field]
        }

        this.errors = new Errors();
    }

    /**
     * Fetch all relevant data for the form.
     */
    data() {
        let form = new FormData()

        for (let property in this.fields) {
            console.log(this.fields[property])
            form.set(property, this.fields[property])
        }

        return form;
    }

    /**
     * Reset the form fields.
     */
    reset() {
        for (let field in this.fields) {
            this.fields[field] = '';
        }

        this.errors.clear();
    }

    /**
     * Submit the form.
     *
     * @param {string} requestType
     * @param {string} url
     */
    submit() {
        return new Promise((resolve, reject) => {
            console.log(this.data().get('username'))
            axios[this.requestType](this.url, this.data())
                .then(response => {
                    this.onSuccess(response.data);
                    resolve(response.data);
                })
                .catch(error => {
                    this.onFail(error.response.data);
                    reject(error.response.data);
                });
        });
    }

    /**
     * Handle a successful form submission.
     *
     * @param {object} data
     */
    onSuccess(data) {
        // alert(data.message); // temporary
        this.reset();
    }

    /**
     * Handle a failed form submission.
     *
     * @param {object} errors
     */
    onFail(errors) {
        this.errors.record(errors);
    }
}