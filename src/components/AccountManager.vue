<script setup lang="ts">
import type { Account } from '@/store/accounts';

import { useAccountsStore } from '@/store/accounts';

import {
  Delete,
  Plus,
} from '@element-plus/icons-vue';

const store = useAccountsStore();

const validateAccount = (account: Account) => {
  account.errors = { label: '', login: '', password: '' };

  if (account.labelText.length > 50) {
    account.errors.label = 'Максимум 50 символов.';
  }

  if (!account.login) {
    account.errors.login = 'Логин обязателен.';
  }
  else if (account.login.length > 100) {
    account.errors.login = 'Максимум 100 символов.';
  }

  if (account.type === 'Локальная' && (!account.password || account.password.length > 100)) {
    account.errors.password = account.password ? 'Максимум 100 символов.' : 'Пароль обязателен.';
  }

  return !account.errors.label && !account.errors.login && !account.errors.password;
};

const updateLabel = (account: Account) => {
  account.label = account.labelText
    .split(';')
    .map(text => ({ text: text.trim() }))
    .filter(obj => obj.text !== '');

  if (validateAccount(account)) {
    store.updateAccount(account);
  }
};

const updateAccount = (account: Account) => {
  if (validateAccount(account)) {
    store.updateAccount(account);
  }
};
</script>

<template>
  <el-container>
    <el-header>
      <h2>Управление учетными записями</h2>
      <el-button type="primary" :icon="Plus" circle @click="store.addAccount" />
    </el-header>
    <el-main>
      <div class="">
        <el-alert title="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ';'" type="info" show-icon />
      </div>

      <el-table :data="store.accounts">
        <el-table-column label="Метка">
          <template #default="{ row }">
            <el-input
              v-model="row.labelText"
              placeholder="Введите метки через ;"
              :class="{ 'invalid-field': row.errors.label }"
              :maxlength="50"
              @blur="updateLabel(row)"
            />
            <div v-if="row.errors.label" class="error">
              {{ row.errors.label }}
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Тип">
          <template #default="{ row }">
            <el-select v-model="row.type" @change="updateAccount(row)">
              <el-option label="LDAP" value="LDAP" />
              <el-option label="Локальная" value="Локальная" />
            </el-select>
          </template>
        </el-table-column>

        <el-table-column label="Логин">
          <template #default="{ row }">
            <el-input
              v-model="row.login"
              :maxlength="100"
              :class="{ 'invalid-field': row.errors.login }"
              @blur="updateAccount(row)"
            />
            <div v-if="row.errors.login" class="error">
              {{ row.errors.login }}
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Пароль">
          <template #default="{ row }">
            <el-input
              v-if="row.type === 'Локальная'"
              v-model="row.password"
              type="password"
              :maxlength="100"
              :class="{ 'invalid-field': row.errors.password }"
              @blur="updateAccount(row)"
            />
            <div v-if="row.errors.password" class="error">
              {{ row.errors.password }}
            </div>
          </template>
        </el-table-column>

        <el-table-column width="120">
          <template #default="{ row }">
            <el-button type="danger" :icon="Delete" circle @click="store.removeAccount(row.id)" />
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<style scoped>
.invalid-field {
  border: 1px solid red !important;
}

.error {
  color: red;
  font-size: 12px;
}
</style>
