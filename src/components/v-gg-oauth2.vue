<template>
  <div>
    <div class="relative card card-side w-96 glass shadow-xl">
      <img class="size-32 p-4 rounded-full" src="../assets/gg.png" alt="Movie" />

      <div class="flex w-full flex-col justify-between">
        <div @click="copy" class="truncate w-40 mt-16 select-all cursor-pointer">
          {{ token }}
        </div>
        <div class="flex justify-end p-4">
          <button @click="login" :disabled="isDisable" class="btn btn-ghost text-primary">
            Get token
          </button>
        </div>
      </div>
      <div class="absolute top-0 right-0">
        <div :onclick="`${idModal}.showModal()`" class="btn btn-ghost size-5">
          <img class="size-5 rounded-full" src="../assets/setting.png" alt="Movie" />
        </div>
      </div>
    </div>
    <dialog :id="idModal" class="modal modal-top sm:modal-middle">
      <div class="modal-box glass">
        <h3 class="font-bold text-lg">Enter client id!</h3>
        <input v-model="clientId" class="input w-[90%]" type="text" />
        <div class="modal-action">
          <form method="dialog">
            <button @click="save" class="btn btn-ghost text-primary">Save</button>
          </form>
          <form method="dialog">
            <button @click="cancel" class="btn btn-ghost">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, nextTick } from "vue";
import { useToast } from "vue-toast-notification";
import { useTokenClient } from "vue3-google-signin";
const idModal = "my_modal_gg";
const keyClientId = "ClientIdGg";
const toast = useToast();
let valueClientId = "";
const clientId = ref();
const token = ref();
const isDisable = computed(() => {
  if (clientId.value) {
    return false;
  }
  return true;
});
const cancel = () => {
  clientId.value = valueClientId;
};

const save = async () => {
  setClientIdLocalStorage();
  window.history.go(0);
};

const getClientIdLocalStorage = () => {
  valueClientId = localStorage.getItem(keyClientId);
};

const setClientIdLocalStorage = () => {
  localStorage.setItem(keyClientId, clientId.value);
};

const onSuccess = (response) => {
  toast.success("Get token success!!", {
    position: "top-right",
    dismissible: true,
  });
  token.value = response.access_token;
  console.log(response);
  console.log(response.access_token);
};

const onFailure = (error) => {
  toast.error("Have error when get Token!!", {
    position: "top-right",
    dismissible: true,
  });
  console.log(error);
};

const { isReady, login } = useTokenClient({
  onSuccess: onSuccess,
  onError: onFailure,
  // other options
});

const copy = () => {
  navigator.clipboard.writeText(token.value);
  toast.success("Copied!!", {
    position: "top-right",
    dismissible: true,
  });
};

onMounted(() => {
  getClientIdLocalStorage();
  clientId.value = valueClientId;
});
</script>

<style></style>
