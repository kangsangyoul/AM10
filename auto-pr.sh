#!/bin/bash
# 자동 브랜치명 생성 (예: auto-YYYYMMDD-HHMMSS)
BRANCH="auto-$(date +%Y%m%d-%H%M%S)"

# 브랜치 생성 및 이동
git checkout -b $BRANCH

# 변경사항 추가
git add .

# 커밋
git commit -m "자동화: 변경점 반영 및 새 PR 생성"

# 푸시
git push origin $BRANCH

# GitHub CLI로 PR 생성 (깃허브 CLI 필수 설치, 로그인 필요)
gh pr create --base main --head $BRANCH --title "자동 PR: $BRANCH" --body "변경점 자동 감지 및 PR 생성. 시안 및 UI/UX 구현 요구 포함."
