'use client';

import { useRef } from 'react';

import PreviewModalLayout from '@/components/common/modal/PreviewModalLayout';
import ProjectPreviewContent from './ProjectPreviewContent';
import ProfilePreviewContent from './ProfilePreviewContent';
import { SAVE_TYPE, type SaveType } from '@/models/preview/previewModels';

import { PageSpinner } from '@/components/common/spinner';

import useSaveImage from '@/hooks/useSaveImage';
import useShareLink from '@/hooks/useShareLink';
interface PreviewModalProps {
  saveType: SaveType;
  projectId?: number;
}

export default function PreviewModal({ saveType, projectId }: PreviewModalProps) {
  const captureRef = useRef<HTMLDivElement>(null);

  const { handleSaveImage, isImageDownloading } = useSaveImage(saveType, captureRef);
  const { handleShareLink } = useShareLink(saveType, projectId);

  return (
    <PreviewModalLayout handleSave={handleSaveImage} handleShare={handleShareLink} ref={captureRef}>
      {saveType === SAVE_TYPE.PROJECT && projectId ? (
        <ProjectPreviewContent projectId={projectId} />
      ) : (
        <ProfilePreviewContent />
      )}
      {isImageDownloading && <PageSpinner />}
    </PreviewModalLayout>
  );
}
