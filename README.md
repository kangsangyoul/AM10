
# AuditMind IR Dashboard

## ✅ 사용 방법
1. 의존성 설치
```bash
npm install
```

2. 로컬 실행
```bash
npm run dev
```

3. Vercel 자동 배포
- GitHub에 푸시하면 Vercel이 자동 배포합니다.
- `vite` 기반 프로젝트입니다.

## 📁 구조
- `Dashboard.jsx`: 주요 UI (KPI, SVG, Heatmap, Table)
- `Sidebar.jsx`: 사이드바 구성
- `Topbar.jsx`: 상단 탭

### ✨ 최근 변경 사항
- 상단바에서 업데이트 시간을 초 단위로 갱신합니다.
- 대시보드 통계와 이벤트 로그가 5초마다 임의의 값으로 갱신되어 동적 화면을 시연합니다.
- `InputData` 영역을 추가하여 파일 업로드, 샘플 데이터 생성, API 데이터 주입을 지원합니다.
