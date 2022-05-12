<script setup lang="ts">
import { computed } from "vue";
import { useAppStore } from "../stores/app-store";

const appStore = useAppStore();

const percentMinted = computed(
    () => (appStore.state.mintedAmount * 100) / appStore.state.maxSupply
);
</script>

<template>
    <v-progress-linear
        v-model="percentMinted"
        class="white--text"
        height="40"
        rounded
        color="#D3461E"
        background-color="#D3461E"
    >
        <strong
            >{{
                new Intl.NumberFormat().format(appStore.state.mintedAmount)
            }}
            minted of
            {{
                new Intl.NumberFormat().format(appStore.state.maxSupply)
            }}</strong
        >
    </v-progress-linear>
</template>

<style lang="scss"></style>
