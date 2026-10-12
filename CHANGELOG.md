# 변경 이력

## English-only GitHub Pages release

### Changed

- Removed the KR/EN controls, runtime language switcher, and obsolete locale dictionaries; the root document is English-only.
- Removed the repeated Contact Us call-to-action from the About, Visitor Guide, Location, and both room detail pages while retaining the shared footer and the dedicated Contact page.
- Replaced the server-only contact endpoint with Formspree submission for GitHub Pages. Required fields, email format, privacy consent, and a honeypot are checked; the UI does not claim success when the endpoint is unconfigured.
- Added a GitHub Actions Pages deployment workflow for the `/rk_pgc/` project path.
- Updated project setup and Formspree configuration guidance in README.

### Configuration required before email delivery

- Verify `rondakorea@rondakorea.com` as a linked Formspree email and select it in the form's Email workflow.
- GitHub Pages settings must use GitHub Actions as the deployment source.

## 0.1.0 — 통합 리뉴얼 초안

### 추가

- 메인 브랜드 디자인을 적용한 소개, 위치·오시는 길, 방문 안내, 문의, 개인정보 페이지와 객실별 상세 경로
- PGC 403 Event Room / PGC 404 Guest Room 사진 갤러리 및 키보드 조작 가능한 확대 모달
- 객실별 실제 시설과 수용 규모를 기준으로 한 Executive Stay, Corporate Workshop, Partner Meeting, Team Offsite 활용 사례
- 한국어·영어 전환, 브라우저 저장 설정, 언어별 리소스 파일
- 주소 복사, 네이버·카카오·Google 지도 이동, 건물 도착·주차 사전 등록 안내
- GitHub Pages용 조건부 정적 export 설정과 `out/` 빌드
- Pages 정적 호스팅을 위한 base path 내부 링크와 서버 RSC 프리페치 제외
- 기존 사이트 비교 및 PPT 요구사항 적용 결과 문서

### 변경

- Business Room / Guest Room 명칭을 각각 PGC 403 Event Room / PGC 404 Guest Room으로 변경
- 403호를 이벤트·미팅 공간이면서 침대 5개를 갖춘 숙박 공간으로 명확히 설명
- 404호의 최대 10명·침대 9개·욕실 2개 정보를 상세 페이지와 실제 용도에 반영
- 메인 객실 카드를 일반 문서 흐름으로 변경해 고정형 스크롤 동작 제거
- 이미지 카드 비율을 통일하고 원본 사진을 유지하면서 갤러리 탐색을 추가
- 메뉴 외부 클릭, Escape, 다른 메뉴 선택, 페이지 이동 및 모바일 메뉴 전환 시 메뉴가 닫히도록 수정
- 정적 사이트의 문의 폼이 서버 전송이 불가능함을 명시하도록 개선
- 한국어 개인정보 페이지 문장과 문의 페이지 이미지 영역의 접근성·레이아웃 경고를 보완

### 제거

- 메인 페이지의 ScrollTrigger 고정 객실 전환 컴포넌트
- 신규 객실 상세 페이지와 중복되는 홈 객실 갤러리 및 반복 소개 정보
- 홈의 객실 소개와 중복되던 캠퍼스/공간 소개 카드

### 알려진 제한

- GitHub Pages 정적 호스팅은 `/api/contact` 서버 기능을 제공하지 않습니다. 온라인 문의 접수에는 서버 배포와 메일 서비스 환경변수가 필요합니다.
- 기존 `pages.yml`은 검사 전용이며 자동 Pages 게시를 구성하지 않습니다.
- 개인정보 처리방침의 운영상 세부 내용은 게시 전 PGC 운영 주체의 검토가 필요합니다.
