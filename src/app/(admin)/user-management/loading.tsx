import PageContainer from '@/components/layout/page-container';
import { tableSkeletonConfig, GridSkeleton } from '@/components/ui/custom/grid/grid-skeleton';

const Loading = () => {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-6 px-4 py-6">
        <GridSkeleton
          config={{
            type: 'grid',
            columns: 12,
            rows: 10,
            className: 'gap-y-4',
            child: [
              // Heading / Section Title
              {
                type: 'item',
                span: 12,
                skeleton: true,
                skeletonClassName: 'h-6 w-40 rounded-md',
              },
              // Row 1: First Name, Last Name, Title
              {
                type: 'item',
                span: 4,
              },
              {
                type: 'item',
                span: 4,
              },
              {
                type: 'item',
                span: 4,
              },
              // Row 2: Primary Email, Phone, NPI Number
              {
                type: 'item',
                span: 4,
              },
              {
                type: 'item',
                span: 4,
              },
              {
                type: 'item',
                span: 4,
              },
              // Row 3: Employee ID, Org, Employment Type
              {
                type: 'item',
                span: 4,
              },
              {
                type: 'item',
                span: 4,
              },
              {
                type: 'item',
                span: 4,
              },
              // Row 4: License Number, License State, Discipline
              {
                type: 'item',
                span: 4,
              },
              {
                type: 'item',
                span: 4,
              },
              {
                type: 'item',
                span: 4,
              },
              // Bottom Line / Verification Methods heading
              {
                type: 'item',
                span: 12,
                skeletonClassName: 'h-5 w-32 rounded',
              },
              // One final row placeholder (e.g. OTP field or switch)
              {
                type: 'item',
                span: 6,
              },
              {
                type: 'item',
                span: 6,
              },
            ],
          }}
        />
      </div>
    </PageContainer>
  );
};

export default Loading;
