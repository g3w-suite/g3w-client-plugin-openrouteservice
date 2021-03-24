<template>
    <div class="g3w-openservice-plugin-panel form-group">
        <bar-loader :loading="state.loading"></bar-loader>
        <form>
            <div class="form-group">
                <button id="g3w-openrouteservice-plugin-run-bottom" class="btn btn-block pull-right" @click.stop="">Run</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'OpenRouteServiceForm',
        data(){
            return {
                state: this.$options.service.state
            }

        },
        computed: {

        },
        mounted(){
        }
    };
</script>
