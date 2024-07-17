<template>
  <n-flex justify="space-between" align="center">
    <n-flex justify="space-between" align="center">
      <span>我的位置：</span>
      <n-breadcrumb>
        <n-breadcrumb-item> <n-icon /> </n-breadcrumb-item>
        <n-breadcrumb-item> <n-icon /> </n-breadcrumb-item>
        <n-breadcrumb-item> <n-icon /> </n-breadcrumb-item>
      </n-breadcrumb>
    </n-flex>
    <div class="operator">
      <n-flex justify="space-between" align="center">
        <div v-for="item in operatorList" :key="item.className" :class="`w-5 h-5 cursor-pointer ${item.className}`"></div>
        <n-dropdown :options="options" @select="handleSelect">
          <n-avatar
            class="avatar"
            round
            :size="30"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
        </n-dropdown>
      </n-flex>
    </div>
  </n-flex>
</template>

<script setup lang="ts">
import { NIcon } from "naive-ui";
import {
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
} from "@vicons/ionicons5";
// import { useUserStore } from "@/store/modules/user";
// import router from "@/router";

// const userStore = useUserStore();
const route = useRoute();

// console.log("route", route, route.meta,router);

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};

const options = ref([
  {
    label: "用户资料",
    key: "profile",
    icon: renderIcon(UserIcon),
  },
  {
    label: "编辑用户资料",
    key: "editProfile",
    icon: renderIcon(EditIcon),
  },
  {
    label: "退出登录",
    key: "logout",
    icon: renderIcon(LogoutIcon),
  },
]);

function handleSelect(key: string | number) {
  console.log("select:", key);
  switch (key) {
    case "logout":
      logout();
      return;
    case "editProfile":
      console.log("编辑用户资料");
      return;
    case "profile":
      console.log("用户资料");
      return;
    default:
      return;
  }
}

function logout() {
  // userStore.logout();
  // router.replace("/");
}
const operatorList = [
  {
    name:'系统信息',
    className: 'icon-sys'
  },
  {
    name:'消息管理',
    className: 'icon-msg'
  },
  {
    name:'任务列表',
    className: 'icon-tasks'
  },
]
</script>

<style scoped>
.icon-sys {
  background: url(~/assets/images/icon-sys-gray.png) no-repeat center center;
  background-size: cover;
}
.icon-sys:hover {
  background: url(~/assets/images/icon-sys-blue.png) no-repeat center center;
  background-size: cover;
}
.icon-msg {
  background: url(~/assets/images/icon-msg-gray.png) no-repeat center center;
  background-size: cover;
}
.icon-msg:hover {
  background: url(~/assets/images/icon-msg-blue.png) no-repeat center center;
  background-size: cover;
}
.icon-tasks {
  background: url(~/assets/images/icon-task-gray.png) no-repeat center center;
  background-size: cover;
}
.icon-tasks:hover {
  background: url(~/assets/images/icon-task-blue.png) no-repeat center center;
  background-size: cover;
}
.avatar {
  cursor: pointer;
}
</style>
