<script setup lang="ts">
import { ref, Ref } from "vue";
const openDialog: Ref<boolean> = ref(false);
</script>

<template>
    <div>
        <v-dialog v-model="openDialog" max-width="500"> </v-dialog>
    </div>
</template>

<style lang="scss"></style>
