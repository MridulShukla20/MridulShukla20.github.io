import { CaseStudyList } from '@/components/CaseStudyList';
import { caseStudies } from '@/content/caseStudies';

export function CaseStudiesView() {
  return (
    <div className="view-inner">
      <CaseStudyList items={caseStudies} />
    </div>
  );
}

export default CaseStudiesView;
