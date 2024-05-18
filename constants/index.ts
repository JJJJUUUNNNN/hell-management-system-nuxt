import type { MenuOption } from "naive-ui";
import { NIcon } from "naive-ui";
import {
  HomeOutline,
  BookOutline,
  SettingsOutline,
  HandLeftOutline,
  FitnessOutline,
  SyncCircleOutline,
  BowlingBallOutline,
  BuildOutline,
  LogoYen,
  ConstructOutline,
} from "@vicons/ionicons5";
import { NuxtLink } from "#components";

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

export const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        NuxtLink,
        {
          to: "/",
        },
        () => "首页"
      ),
    key: "home",
    children: [
      {
        label: () =>
          h(
            NuxtLink,
            {
              to: "/homeHellData",
            },
            () => "地府大数据"
          ),
        key: "home_hell_data",
      },
    ],
    icon: renderIcon(HomeOutline),
  },
  {
    label: "生死簿",
    key: "life_death_book",
    children: [
      {
        label: () =>
          h(
            NuxtLink,
            {
              to: "/lifeDeathBook/userManage",
            },
            () => "用户管理"
          ),
        key: "life_death_book_user_manage",
      },
      {
        label: () =>
          h(
            NuxtLink,
            {
              to: "/lifeDeathBook/dataManage",
            },
            () => "数据同步"
          ),
        key: "life_death_book_data_manage",
      },
    ],
    icon: renderIcon(BookOutline),
  },
  {
    label: "勾魂管理",
    key: "seductive_manage",
    children: [
      {
        label: () =>
          h(
            NuxtLink,
            {
              to: "/seductiveManage/seductiveManager",
            },
            () => "勾魂使者"
          ),
        key: "seductive_manage_manager",
      },
      {
        label: () =>
          h(
            NuxtLink,
            {
              to: "/seductiveManage/seductiveData",
            },
            () => "勾魂数据"
          ),
        key: "seductive_manage_data",
      },
    ],
    icon: renderIcon(SettingsOutline),
  },
  {
    label: "阎王殿审判",
    key: "hell_trial",
    children: [
      {
        label: () =>
          h(
            NuxtLink,
            {
              to: "/hellTrial/tenPalace",
            },
            () => "十殿"
          ),
        key: "hell_trial_ten",
      },
      {
        label: () =>
          h(
            NuxtLink,
            {
              to: "/hellTrial/trialHistory",
            },
            () => "审判记录"
          ),
        key: "hell_trial_history",
      },
      {
        label: () =>
          h(
            NuxtLink,
            {
              to: "/hellTrial/trialData",
            },
            () => "数据同步"
          ),
        key: "hell_trial_data",
      },
    ],
    icon: renderIcon(HandLeftOutline),
  },
  {
    label: "十八层地狱",
    key: "eighteen_hell",
    children: [
      {
        label: () =>
          h(
            NuxtLink,
            {
              to: "/eighteenHell/deviceManage",
            },
            () => "设备管理"
          ),
        key: "eighteen_hell_device_manage",
      },
      {
        label: () =>
          h(
            NuxtLink,
            {
              to: "/eighteenHell/workProcess",
            },
            () => "作业流程"
          ),
        key: "eighteen_hell_work_process",
      },
      {
        label: () =>
          h(
            NuxtLink,
            {
              to: "/eighteenHell/hellData",
            },
            () => "地狱数据"
          ),
        key: "eighteen_hell_data",
      },
    ],
    icon: renderIcon(FitnessOutline),
  },
  {
    label: "六道轮回",
    key: "reincarnation",
    children: [
      {
        label: () =>
          h(
            NuxtLink,
            {
              to: "/reincarnation/reincarnationDisk",
            },
            () => "轮回盘"
          ),
        key: "reincarnation_disk",
      },
      {
        label: () =>
          h(
            NuxtLink,
            {
              to: "/reincarnation/reincarnationHistory",
            },
            () => "轮回记录"
          ),
        key: "reincarnation_history",
      },
    ],
    icon: renderIcon(SyncCircleOutline),
  },
  {
    label: "冥币管理",
    key: "money",
    children: [
      {
        label: () =>
          h(
            NuxtLink,
            {
              to: "/money/moneyTransfer",
            },
            () => "汇款"
          ),
        key: "money_transfer",
      },
      {
        label: () =>
          h(
            NuxtLink,
            {
              to: "/money/moneyManage",
            },
            () => "汇款管理"
          ),
        key: "money_manage",
      },
    ],
    icon: renderIcon(LogoYen),
  },
  {
    label: () =>
      h(
        NuxtLink,
        {
          to: "/logManage",
        },
        () => "日志管理"
      ),
    key: "log_manage",
    icon: renderIcon(BowlingBallOutline),
  },
  {
    label: "角色权限",
    key: "role_permission",
    children: [
      {
        label: () =>
          h(
            NuxtLink,
            {
              to: "/rolePermission/roleManage",
            },
            () => "角色管理"
          ),
        key: "role_manage",
      },
      {
        label: () =>
          h(
            NuxtLink,
            {
              to: "/rolePermission/permissionSetting",
            },
            () => "权限设置"
          ),
        key: "permission_setting",
      },
    ],
    icon: renderIcon(BuildOutline),
  },
  {
    label: "系统管理",
    key: "system_manage",
    children: [
      {
        label: () =>
          h(
            NuxtLink,
            {
              to: "/systemManage/systemManager",
            },
            () => "管理员"
          ),
        key: "system_manager",
      },
      {
        label: () =>
          h(
            NuxtLink,
            {
              to: "/systemManage/systemSetting",
            },
            () => "系统设置"
          ),
        key: "system_setting",
      },
    ],
    icon: renderIcon(ConstructOutline),
  },
];
