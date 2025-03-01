import { defineStore } from 'pinia';
import { ref } from 'vue';

const STORE_KEY = 'accounts';

export interface Account {
  id: number;
  labelText: string;
  label: { text: string }[];
  type: 'LDAP' | 'Локальная';
  login: string;
  password: string | null;
  errors: { label: string; login: string; password: string };
}

export const useAccountsStore = defineStore(STORE_KEY, () => {
  const accounts = ref<Account[]>(JSON.parse(localStorage.getItem(STORE_KEY) || '[]'));

  const saveToLocalStorage = () => {
    localStorage.setItem(STORE_KEY, JSON.stringify(accounts.value));
  };

  const addAccount = () => {
    accounts.value.push({
      id: Date.now(),
      labelText: '',
      label: [],
      type: 'LDAP',
      login: '',
      password: null,
      errors: { label: '', login: '', password: '' },
    });

    saveToLocalStorage();
  };

  const removeAccount = (id: number) => {
    accounts.value = accounts.value.filter(account => account.id !== id);

    saveToLocalStorage();
  };

  const updateAccount = (account: Account) => {
    const index = accounts.value.findIndex(acc => acc.id === account.id);
    if (index !== -1) {
      accounts.value[index] = account;

      saveToLocalStorage();
    }
  };

  return {
    accounts,
    addAccount,
    removeAccount,
    updateAccount,
  };
});
