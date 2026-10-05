import { CaseStudyList } from '@/components/CaseStudyList';
import { projects } from '@/content/projects';

export function ProjectsView() {
  return (
    <div className="view-inner">
      <CaseStudyList items={projects} />
    </div>
  );
}

export default ProjectsView;
