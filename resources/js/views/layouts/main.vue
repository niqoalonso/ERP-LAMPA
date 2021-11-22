<script>
import {
    layoutComputed
} from "../../state/helpers.js";
import Vertical from "./vertical";
import Horizontal from "./horizontal";

/**
 * Main Layout
 */
export default {
    components: {
        Vertical,
        Horizontal,
    },
    data() {
        return {};
    },
    computed: {
        ...layoutComputed,
    },
    mounted() {
        document.body.classList.remove('authentication-bg')
    },
    methods: {},
};
</script>

<template>
<div>
    <Vertical v-if="layoutType === 'vertical'" :layout="layoutType">
        <slot />
    </Vertical>

    <Horizontal v-if="layoutType === 'horizontal'" :layout="layoutType">
        <slot />
    </Horizontal>
</div>
</template>
