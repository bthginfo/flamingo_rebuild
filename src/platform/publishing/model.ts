export type PublishValidationIssue = {
  scope: 'global' | 'page' | 'section' | 'collection' | 'navigation';
  path: string;
  message: string;
};

export type PublishState = {
  hasDraftChanges: boolean;
  lastPublishedAt?: string;
  issues: readonly PublishValidationIssue[];
};

export function canPublish(state: PublishState): boolean {
  return state.hasDraftChanges && state.issues.length === 0;
}
