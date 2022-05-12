<script setup lang="ts">
import logo from "@/assets/images/logo.png";
import ConnectButton from "../components/ConnectButton.vue";
import MintProgressBar from "../components/MintProgressBar.vue";
import MintModal from "../components/MintModal.vue";
import { ref, Ref, onMounted } from "vue";
import { useDisplay } from "vuetify";
import { useAppStore } from "../stores/app-store";

const display = useDisplay();
const appStore = useAppStore();

const isModalOpen: Ref<boolean> = ref(false);
const showModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

onMounted(() => {
    appStore.loadState();
    setInterval(appStore.loadState, 5000);
});
</script>

<template>
    <div :class="display.name.value" class="d-flex justify-center fill-height">
        <div id="page-body">
            <div class="d-flex justify-space-between align-center px-md-0 px-3">
                <v-btn
                    outlined
                    plain
                    icon
                    target="_blank"
                    href="https://soulfoodsisterbrother.com/"
                >
                    <v-icon>mdi-home</v-icon>
                </v-btn>
                <ConnectButton />
            </div>
            <div id="content-card" class="pa-8 mt-5">
                <div class="text-center">
                    <v-img contain max-height="120" :src="logo"></v-img>
                    <h2 class="mt-6 text-h4">Minting Event</h2>
                    <p v-if="appStore.state.price != 0">
                        Only {{ appStore.state.price }} ETH
                    </p>
                    <MintProgressBar class="my-4" />
                    <v-btn
                        @click="showModal"
                        class="mint-btn mt-4"
                        dark
                        elevation="2"
                        :disabled="appStore.state.price == 0"
                        x-large
                        color="#654125"
                    >
                        Mint
                    </v-btn>
                </div>
            </div>
        </div>
        <MintModal :show-modal="isModalOpen" @close="closeModal" />
    </div>
</template>

<style lang="scss" scoped>
#page-body {
    margin-top: 6em;
}
#content-card {
    background-color: rgba(255, 255, 255, 0.6);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    width: 45em;
    min-height: 200px;
    border-radius: 6px;
}

.mint-btn {
    color: white !important;
    font-size: 1em;
    padding: 1.3em 2em;
}

.sm,
.xs {
    #content-card {
        width: 100%;
    }
    #page-body {
        width: 100%;
        height: 100%;
    }
}
</style>
