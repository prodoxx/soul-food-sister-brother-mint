import { defineStore } from "pinia";
import { reactive, DeepReadonly } from "vue";
import { DEFAULT_NETWORK } from "../constants";
import {
    StaticJsonRpcProvider,
    JsonRpcProvider,
    Web3Provider,
} from "@ethersproject/providers";
import { getNetworkParams } from "../helpers/network-params";
import { ethers } from "ethers";
import { getAddresses } from "../constants";
import { SFSBCollectionContract } from "../abi";

interface AppState {
    mintedAmount: number;
    maxSupply: number;
    price: number;
}

interface AppStore {
    state: DeepReadonly<AppState>;
    loadState(): void;
}

export const useAppStore = defineStore("app", (): AppStore => {
    const state = reactive<AppState>({
        mintedAmount: 0,
        maxSupply: 0,
        price: 0,
    });

    const provider = new StaticJsonRpcProvider(getNetworkParams().rpcUrls[0]);
    const addresses = getAddresses(DEFAULT_NETWORK);
    const collectionHelper = new ethers.Contract(
        addresses.NFT_COLLECTION,
        SFSBCollectionContract,
        provider
    );

    const loadState = async () => {
        state.mintedAmount = await collectionHelper.totalSupply();
        state.maxSupply = await collectionHelper.maxSupply();
        state.price = (await collectionHelper.getPrice()) / Math.pow(10, 18);
    };

    return {
        state,
        loadState,
    };
});
