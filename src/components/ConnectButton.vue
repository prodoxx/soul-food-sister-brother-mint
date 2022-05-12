<script setup lang="ts">
import { computed } from "vue";
import { DEFAULT_NETWORK } from "../constants";
import { useWalletStore } from "../stores/wallet-store";
const wallet = useWalletStore();
let clickFunc = async () => {
    if (
        wallet.state.isConnected &&
        wallet.state.providerChainID !== DEFAULT_NETWORK
    ) {
        await wallet.checkWrongNetwork();
    } else if (wallet.state.isConnected) {
        wallet.disconnect();
    } else {
        await wallet.connect();
    }
};

interface ButtonProps {
    buttonText: string;
    color: string;
    variant: any;
}

const buttonProps = computed((): ButtonProps => {
    if (
        wallet.state.isConnected &&
        wallet.state.providerChainID !== DEFAULT_NETWORK
    ) {
        return {
            buttonText: "Wrong Network",
            color: "red",
            variant: "contained",
        };
    } else if (wallet.state.isConnected) {
        return {
            buttonText: "Disconnect",
            color: "black",
            variant: "outlined",
        };
    } else {
        return {
            buttonText: "Connect",
            color: "black",
            variant: "contained",
        };
    }
});
</script>
<template>
    <div>
        <span v-if="wallet.state.isConnected" class="mr-4 font-weight-bold"
            >{{ wallet.state.address.substring(0, 10) }}...</span
        >
        <v-btn
            @click.stop="clickFunc"
            elevation="2"
            x-large
            :variant="buttonProps.variant"
            :color="buttonProps.color"
        >
            {{ buttonProps.buttonText }}
        </v-btn>
    </div>
</template>

<style lang="scss"></style>
