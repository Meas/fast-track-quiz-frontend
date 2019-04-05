export default {
    getQuestions(instance)
    {
        return instance.$http.get('/questions').then(response => {
            return response.data;
        }).catch(e => {
            /* eslint-disable-next-line no-console */
            console.log(e);
        });
    },
    submitAnswers(instance, data)
    {
        return instance.$http.post('/answers', data).then(response => {
            return response.data;
        }).catch(e => {
            /* eslint-disable-next-line no-console */
            console.log(e);
        });
    },
}