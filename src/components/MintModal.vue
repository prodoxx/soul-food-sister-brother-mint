<script setup lang="ts">
import { ref, Ref, defineProps, defineEmits, computed } from "vue";
import Slider from "@vueform/slider";
import { useAppStore } from "../stores/app-store";
import { useWalletStore } from "../stores/wallet-store";
import { DEFAULT_NETWORK, getAddresses } from "../constants";
import { ethers } from "ethers";
import { SFSBCollectionContract } from "../abi";
import { useEmitter } from "../hooks/emitter";

const appStore = useAppStore();
const walletStore = useWalletStore();
const globalEmitter = useEmitter();

const addresses = getAddresses(DEFAULT_NETWORK);

const props = defineProps({
    showModal: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["close"]);

const amount: Ref<number> = ref(1);
const isBusy: Ref<boolean> = ref(false);
const minMint = 1;
const maxMint = 10;

const closeModal = () => {
    emit("close");
};

const onSliderChange = (value: number) => {
    amount.value = value;
};

const cost = computed(() => amount.value * appStore.state.price);

const onMintConfirmed = async () => {
    const collectionHelper = new ethers.Contract(
        addresses.NFT_COLLECTION,
        SFSBCollectionContract,
        walletStore.state.provider.getSigner()
    );

    isBusy.value = true;

    try {
        const tx = await collectionHelper.mint(amount.value, {
            value: String(cost.value * Math.pow(10, 18)),
        });
        globalEmitter.emit(
            "show-message",
            `Successfully minted! Tx: ${tx.hash} `,
            true
        );
    } catch (error: any) {
        console.log({ error });
        globalEmitter.emit(
            "show-message",
            `Failed to mint! Error: ${
                typeof error === "string" ? error : error.message
            }`,
            false
        );
    } finally {
        isBusy.value = false;
    }
};
</script>

<template>
    <div class="modal" :class="{ 'd-none': !props.showModal }">
        <div class="d-flex justify-center align-center fill-height">
            <v-card class="px-5 py-3" width="500">
                <v-card-title
                    class="text-h5 primary white--text mb-4 d-flex justify-space-between px-0"
                >
                    Confirm Mint Amount
                    <v-btn variant="plain" icon @click="closeModal">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text class="pt-0">
                    <p class="text-center text-h5 font-weight-bold">
                        {{ cost }} ETH
                    </p>
                    <Slider
                        class="mint-slider mt-10 mb-4"
                        v-model="amount"
                        :min="minMint"
                        :max="maxMint"
                        @change="onSliderChange"
                    />
                    <p class="text-center">Amount to mint</p>
                </v-card-text>
                <v-card-actions class="d-flex justify-end pt-0">
                    <v-progress-circular
                        class="mr-3"
                        indeterminate
                        color="#D3461E"
                        v-if="isBusy"
                    ></v-progress-circular>
                    <v-btn
                        :disabled="isBusy"
                        @click.stop="onMintConfirmed"
                        variant="outlined"
                    >
                        Confirm
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<style src="@vueform/slider/themes/default.css"></style>
<style lang="scss" scoped>
.modal {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
}

.mint-slider {
    --slider-connect-bg: #d7844f;
    --slider-tooltip-bg: #d7844f;
    --slider-handle-ring-color: #ef444430;
}
</style>
