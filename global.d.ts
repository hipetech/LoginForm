import type { NavigationStackParamList } from './src/types/NavigationStackParamList.ts';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends NavigationStackParamList {}
  }
}
