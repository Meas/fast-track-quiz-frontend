export default {
    methods: {
        bindBeforeUnload() {
            window.onbeforeunload = () => true;
        },
        removeBeforeUnload() {
            window.onbeforeunload = () => {};
        }
    }
}