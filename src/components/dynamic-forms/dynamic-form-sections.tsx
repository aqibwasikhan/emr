'use client';

import { FieldConfig, SectionConfig } from '@/types/forms';
import { Grid, GridItem } from '@/components/ui/custom/grid';
import { Separator } from '@/components/ui/separator';
import RenderField from '@/components/dynamic-forms/render-fields';
import { Suspense } from 'react';
import { cn } from '@/lib/utils';
import { FieldType } from '@/enums/form';

const Field = ({ field }: { field: FieldConfig }) => {
  const { xs, sm, md, lg, xl } = field.styling ?? {};
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GridItem xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
        <RenderField field={field} />
      </GridItem>
    </Suspense>
  );
};

export default function DynamicFormSections({ config }: { config: SectionConfig[] }) {

  return (
    <>
      {config.map((section, sIdx) => (
        <div key={sIdx} className={cn('space-y-4',
          section.formFields[0]?.type === FieldType.MULTI_CHECKBOX && 'bg-[var(--pri-grey-5)] p-4 rounded-2xl shadow-[inset_0px_0px_5px_0px_rgba(67,67,67,0.20)]',
        )}>
          <div>
            <span className="font-semibold text-sm text-foreground">{section.sectionName}</span>
          </div>

          <Grid className="gap-x-4 gap-y-2">
            {section.formFields.map((field, fIdx) => (
              <Field key={fIdx} field={field} />
            ))}
          </Grid>

          {section.separator && <Separator className="seprater-light-gredient" />}
        </div>
      ))}
    </>
  );
}
