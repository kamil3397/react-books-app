import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface TProps {
  i18nKey: string;
  children: (translated: string) => ReactNode;
}

export const Translation = ({ i18nKey, children }: TProps) => {
  const { t } = useTranslation();
  return children(t(i18nKey));
};
