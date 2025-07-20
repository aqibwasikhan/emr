import PageContainer from '@/components/layout/page-container';
import { tableSkeletonConfig, GridSkeleton } from '@/components/ui/custom/grid/grid-skeleton';

const Loading = () => {
  return (
    <PageContainer scrollable={false} >
      <div className='flex flex-1 flex-col space-y-4'>
        <GridSkeleton
          config={{
            type: 'grid',
            className: 'h-full',
            columns: 12,
            rows: 12,
            child: [
              {
                type: 'item',
                span: 2,

              },
              {
                type: 'item',
                span: 7,
                skeleton: false,
              },
              {
                type: 'item',
                span: 3,
              },
              {
                type: 'item',
                span: 7,
              },
              {
                type: 'item',
                span: 12,
                rowSpan: 9,
                child: [
                  tableSkeletonConfig({
                    rows: 6,
                    filledRows: 6,
                    columns: [{ span: 9 }, { span: 2 }, { span: 2 }],
                  }),
                ],
              },
            ],
          }}
        />
      </div>

    </PageContainer>

  );
};

export default Loading;
