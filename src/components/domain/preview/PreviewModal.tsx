'use client';

import { useRef } from 'react';

import { PageSpinner } from '@/components/common/spinner';
import PreviewModalLayout from '@/components/common/modal/PreviewModalLayout';

import useShareLink from './hooks/useShareLink';
import useSaveImage from './hooks/useSaveImage';

import { SAVE_TYPE, type SaveType } from '@/models/preview/previewModels';
import ProjectPreviewContent from './ProjectPreviewContent';
import ProfilePreviewContent from './ProfilePreviewContent';

interface PreviewModalProps {
  saveType: SaveType;
  projectId?: number;
}

export default function PreviewModal({ saveType, projectId }: PreviewModalProps) {
  const captureRef = useRef<HTMLDivElement>(null);

  const { handleSaveImage, isImageDownloading } = useSaveImage<HTMLDivElement>(
    saveType,
    captureRef,
  );
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
