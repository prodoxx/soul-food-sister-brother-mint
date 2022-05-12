<template>
    <v-app>
        <v-main>
            <MintPage />
            <v-snackbar
                absolute
                right
                top
                multi-line
                :color="snackbarColor"
                v-model="snackbar"
            >
                {{ snackbarText }}

                <template v-slot:actions>
                    <v-btn
                        icon
                        color="white"
                        variant="text"
                        @click="snackbar = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </template>
            </v-snackbar>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import MintPage from "@/pages/MintPage.vue";
import { ref, Ref, onMounted } from "vue";
import { useEmitter } from "./hooks/emitter";
import { useWalletStore } from "./stores/wallet-store";

const wallet = useWalletStore();
const emitter = useEmitter();
const snackbar: Ref<boolean> = ref(false);
const snackbarText: Ref<string> = ref("");
const snackbarColor: Ref<string> = ref("success");

emitter.on("show-message", (message: string, isSuccess: boolean = true) => {
    if (isSuccess) {
        snackbarColor.value = "success";
    }
    {
        snackbarColor.value = "error";
    }

    snackbar.value = false;
    snackbarText.value = message;
    snackbar.value = true;
});

onMounted(() => {
    if (wallet.hasCachedProvider()) {
        try {
            wallet.connect();
        } catch (error) {
            console.log(`Wallet connect error: ${error}`);
        }
    }
});
</script>

<style lang="scss">
.v-main {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100%25' width='100%25'%3E%3Cdefs%3E%3Cpattern id='doodad' width='40' height='40' viewBox='0 0 40 40' patternUnits='userSpaceOnUse' patternTransform='rotate(135)'%3E%3Crect width='100%25' height='100%25' fill='rgba(255, 245, 245,1)'/%3E%3Cpath d='M0 29a 9-9 0 0 0 9-9a 11-11 0 0 1 11-11v2a-9 9 0 0 0-9 9a-11 11 0 0 1-11 11zM0 69a 9-9 0 0 0 9-9a 11-11 0 0 1 11-11v2a-9 9 0 0 0-9 9a-11 11 0 0 1-11 11z' fill='rgba(169, 75, 27,1)'/%3E%3Cpath d='M20 29.5a 9.5-9.5 0 0 0 9.5-9.5a 10.5-10.5 0 0 1 10.5-10.5v1a-9.5 9.5 0 0 0-9.5 9.5a-10.5 10.5 0 0 1-10.5 10.5z' fill='rgba(101, 65, 38,1)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23doodad)' height='200%25' width='200%25'/%3E%3C/svg%3E ")
        no-repeat center center fixed !important;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
</style>
