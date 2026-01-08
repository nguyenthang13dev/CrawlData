/** @jsxImportSource @emotion/react */
import React from 'react';
import AppBreadcrumb from '@/components/layout-components/AppBreadcrumb';
import { css } from '@emotion/react';
import { MEDIA_QUERIES } from '@/constants/ThemeConstant';

interface PageHeaderProps {
  title?: string;
  display: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, display }) => {
  return display ? (
    <div
      css={css`
        align-items: center;
        margin-bottom: 1rem;
        @media ${MEDIA_QUERIES.LAPTOP_ABOVE} {
          display: flex;
        }
      `}
    >
      <h4 className="mb-0 mr-3 font-weight-semibold">
        {title ? title : 'Trang chủ'}
      </h4>
    </div>
  ) : null;
};

export default PageHeader;