import { NavigationStackParamList } from './src/types/navigation.ts';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends NavigationStackParamList {}
  }
}
