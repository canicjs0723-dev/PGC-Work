# 판교글로벌캠퍼스 홈페이지 운영자 매뉴얼

이 문서는 기존 화면의 디자인과 기능을 유지하면서 사진·문구를 수정하고 로컬에서 확인한 뒤 배포하는 방법을 설명합니다. 운영 변경은 `main`에 바로 하지 말고 작업 브랜치에서 검토한 뒤 반영하세요.

## 1. 프로젝트 구조

이 사이트는 정적 HTML 파일만으로 만든 사이트나 Vite 프로젝트가 아닙니다. **Next.js 16 App Router + React 19 + TypeScript + Tailwind CSS 4** 프로젝트이며, GitHub Actions가 정적 사이트로 빌드해 GitHub Pages에 배포합니다.

```text
src/
  app/             페이지 경로와 페이지별 레이아웃
  components/      공통 UI 및 기능 컴포넌트
  content/         수정 빈도가 높은 사이트·객실·안내·슬라이더 데이터
  lib/             이미지 로더 등 공통 기능
public/images/     웹에서 쓰는 이미지 원본
.github/workflows/ GitHub Pages 빌드/배포 자동화
out/               정적 빌드 결과(생성물, 직접 수정 금지)
docs/              운영 문서와 이미지 목록
```

| 브라우저 페이지 | 소스 위치 |
|---|---|
| 홈 `/` | `src/app/page.tsx`, `src/components/Hero.tsx`, `src/components/HomeHighlightsSlider.tsx` |
| About `/about/` | `src/app/about/page.tsx` |
| 객실 403 `/business-room/` | `src/app/business-room/page.tsx`, 공통 화면 `src/components/RoomPage.tsx` |
| 객실 404 `/guest-room/` | `src/app/guest-room/page.tsx`, 공통 화면 `src/components/RoomPage.tsx` |
| Visitor Guide `/guide/` | `src/app/guide/page.tsx` |
| Location `/location/` | `src/app/location/page.tsx` |
| 문의 `/contact/` | `src/app/contact/page.tsx`, `src/components/ContactForm.tsx` |
| 개인정보 `/privacy/` | `src/app/privacy/page.tsx` |

## 2. VS Code에서 열고 미리보기

1. 저장소를 복제하거나 작업 브랜치를 가져옵니다. 예를 들어:

   ```powershell
   git clone https://github.com/jihyun37/rk_pgc.git
   cd rk_pgc
   git switch ops-maintenance-guide
   ```

   이미 복제되어 있다면 `git fetch origin` 후 `git switch ops-maintenance-guide`를 사용합니다. 이 문서 작업 브랜치는 원본 `main`에서 분기했습니다.
2. `rk_pgc` 폴더를 VS Code에서 엽니다 (**File → Open Folder**).
3. VS Code의 **Terminal → New Terminal**에서 최초 1회 `npm ci`를 실행합니다.
4. `npm run dev -- --webpack`으로 로컬 개발 서버를 실행합니다.
5. 브라우저에서 `http://localhost:3000`을 엽니다. 파일을 저장하면 개발 미리보기에 반영됩니다.
6. 완료 후 `Ctrl+C`로 개발 서버를 종료합니다.

GitHub Pages용 접두사(`/rk_pgc/`)가 붙은 운영 주소는 로컬 개발 주소와 다릅니다. 내부 링크와 이미지를 수정한 뒤 홈, About, 두 객실, Guide, Location, Contact, Privacy 페이지를 모두 확인하세요.

## 3. 텍스트와 메뉴 수정

반복적으로 수정할 데이터는 이미 별도 파일로 분리되어 있습니다.

| 수정 내용 | 파일 |
|---|---|
| 상단/하단 메뉴, 사이트 이름, 주소, 연락처, 공통 소개, 위치·주차 정보, 홈 사용 사례 | `src/content/site.ts` |
| 홈 Two Spaces 슬라이더의 제목·설명·이미지 경로 | `src/content/highlights.ts` |
| 403·404 객실명, 설명, 편의시설, 객실 이미지 | `src/content/rooms.ts` |
| 예약·체크인 안내, 이용수칙, FAQ | `src/content/guide.ts` |
| 개인정보 안내문 | `src/content/contact.ts` |

VS Code에서 해당 파일을 열어 문자열만 바꾸면 됩니다. 메뉴의 `href`, 방의 `slug`, 객실 사실 정보의 배열 구조 등 코드 형태의 값은 기존 형식을 유지해야 합니다. 페이지의 구조적 제목이나 특정 페이지 전용 문구가 데이터 파일에 없으면 `src/app/해당경로/page.tsx` 또는 해당 컴포넌트에서 문구를 검색(`Ctrl+Shift+F`)해 수정합니다. 주소·연락처는 `site.ts` 값을 단일 기준으로 사용하세요.

## 4. 사진 교체와 경로

사용 중인 전체 이미지 파일과 페이지별 용도는 [이미지 목록](./IMAGE-INVENTORY-KO.md)을 참고하세요. 모든 이미지가 기존 경로 `public/images/` 아래에 모여 있으며, 이름 앞부분으로 `403-`, `404-`, `building-`, `campus-`, `identity-` 등 사용 영역을 알아볼 수 있습니다.

- 같은 사진을 교체할 때는 **같은 이름과 확장자**로 `public/images/`에 덮어쓰기만 하면 됩니다. 컴포넌트/데이터의 경로 수정은 필요하지 않습니다.
- 이 구조는 기존 공개 경로(`/images/...`)와 디자인을 그대로 유지하기 위해 사용합니다. 기존 파일을 새 하위 폴더로 옮기거나 이름을 바꾸면 관련 페이지가 깨질 수 있습니다. 이동/이름 변경은 이미지 목록에 적힌 모든 코드 참조를 한 번에 수정하고 빌드와 페이지 점검을 마친 뒤에만 하세요.
- 저장소에 반영한 다음 GitHub Pages는 파일명·URL이 같아도 브라우저/CDN 캐시가 남을 수 있습니다. Ctrl+F5로 확인하고, 필요 시 동일 파일을 새로 빌드해 다시 배포합니다.
- 가능하면 JPG 또는 PNG 원본을 유지하고, 파일 확장자 대소문자도 참조 경로와 동일하게 맞추세요. 이미지를 올릴 때는 `public/images/`에 추가하는 것만으로는 화면에 나타나지 않으며 데이터의 `src` 또는 페이지의 `src`도 연결해야 합니다.

## 5. 스타일과 기능 수정 위치

- 사이트 공통 폰트·색상·전역 CSS·애니메이션: `src/app/globals.css`
- 개별 화면 레이아웃·반응형 Tailwind 클래스: 각 `src/app/**/page.tsx`
- 공통 헤더·푸터·Hero·폼·객실 화면·갤러리: `src/components/`의 같은 이름 파일
- 이미지 파일을 참조하는 핵심 데이터: `src/content/site.ts`, `rooms.ts`, `highlights.ts`

Tailwind 반응형 접두사(`sm:`, `md:`, `lg:`)와 기존 CSS 클래스를 유지하세요. 화면 구조를 변경하기 전에 데스크톱뿐 아니라 모바일 폭에서도 확인합니다. 자동 생성된 `out/`, `.next/`, `node_modules/` 내부 파일은 직접 수정하지 마세요.

## 6. 점검과 정적 빌드

작업 브랜치의 프로젝트 루트에서:

```powershell
npm run lint
npx tsc --noEmit
```

GitHub Pages 빌드는 GitHub Actions에서 실행하는 것이 가장 안전합니다. 로컬에서 Pages용 결과물을 만들려면 PowerShell에서:

```powershell
$env:GITHUB_PAGES = "1"
$env:PAGES_BASE_PATH = "/rk_pgc"
npm run build -- --webpack
```

빌드가 성공하면 업로드 가능한 정적 결과가 `out/`에 생성됩니다. `out/`은 결과물이므로 소스 편집 장소가 아닙니다.

## 7. GitHub Pages 변경 반영

워크플로 파일은 `.github/workflows/pages.yml`입니다. `main`으로 push될 때 lint 및 빌드 후 GitHub Pages를 배포하고, `main`을 대상으로 한 Pull Request에서는 배포 없이 빌드 검사만 합니다.

1. `main`에서 별도 작업 브랜치를 만듭니다. (`ops-maintenance-guide`는 이 문서와 데이터 분리 작업 브랜치입니다.)
2. 수정 내용을 저장하고 `npm run lint`, `npx tsc --noEmit` 및 로컬 미리보기를 확인합니다.
3. 작업 브랜치를 GitHub에 push하고 `main` 대상 Pull Request를 엽니다.
4. Pull Request의 Actions 검사 결과를 확인한 뒤 승인된 변경만 `main`에 merge합니다.
5. merge가 시작한 **Deploy GitHub Pages** workflow가 완료되고 성공했는지 확인합니다.
6. `https://jihyun37.github.io/rk_pgc/`와 변경 페이지를 새로고침해 확인합니다.

작업 브랜치 자체를 push하는 것만으로는 공개 페이지가 바뀌지 않습니다. 원본 `main`은 수정하지 않고 유지할 수 있으며, 이 매뉴얼/정리 변경 역시 별도 브랜치로 분리했습니다.

## 8. 별도 FTP/SFTP 호스팅 배포

이 프로젝트는 Next.js이므로 **소스 코드 전체를 웹 루트에 업로드하는 방식이 아닙니다.** 일반적인 정적 웹호스팅에는 `out/`의 빌드 결과를 업로드합니다. 도메인 루트(`/`)에 설치하는 호스팅에서는 `PAGES_BASE_PATH`를 빈 값으로 두어야 URL에 GitHub 프로젝트 경로 `/rk_pgc/`가 붙지 않습니다.

PowerShell 빌드 예시:

```powershell
$env:GITHUB_PAGES = "1"
$env:PAGES_BASE_PATH = ""
npm ci
npm run lint
npm run build -- --webpack
```

1. `npm ci`로 의존성을 설치하고 lint 및 빌드가 성공하는지 확인합니다.
2. 빌드가 완료되면 `out/` 폴더 안에 `index.html`, 페이지별 HTML 폴더, `_next/`, `images/` 등이 생성됩니다.
3. FTP 또는 SFTP 클라이언트로 **`out/` 폴더 자체가 아니라 그 안의 모든 파일과 폴더**를 호스팅의 웹 문서 루트(예: `public_html/`, `www/`, `htdocs/`)에 업로드합니다. `_next/`와 `images/` 폴더 구조는 그대로 보존하세요.
4. 업로드 후 홈과 모든 하위 페이지, 이미지, 모바일 레이아웃, 문의 양식을 확인합니다.
5. 새 배포는 `out/` 전체를 최신 결과로 교체합니다. 기존 웹 루트에서 사이트와 무관한 파일을 삭제하지 않도록 업로드 대상 경로를 확인하세요.

호스팅이 Node.js 서버 실행을 지원하는 경우에는 정적 업로드와 별도로 서버 배포 구성을 마련해야 합니다. 위 절차는 FTP/SFTP만 제공하는 정적 호스팅 기준입니다. 문의 양식은 FormSubmit을 통해 evan.kim@rondakorea.com으로 전송되므로, 최초 1회 수신함에서 활성화(Activate Form)가 되어 있어야 합니다.

## 9. 관리자 로그인 CMS 검토

현재 사이트는 GitHub Pages에 올리는 정적 사이트라 웹사이트 안에서 로그인한 뒤 저장소 파일을 직접 수정하는 관리자 기능은 없습니다. 현재 요구라면 `src/content/`의 데이터 파일 편집 + Pull Request 검토 방식이 디자인을 보존하고 추가 서버 비용 없이 운영하기 쉽습니다.

비개발 운영자가 브라우저 관리자 화면에서 직접 수정해야 하는 요구가 생기면 **Decap CMS 같은 Git 기반 CMS**를 추가할 수 있습니다. 페이지 화면은 그대로 두고 CMS가 `src/content/` 또는 CMS용 JSON/YAML 데이터를 커밋하며, GitHub Actions가 재빌드/배포하는 구조가 적합합니다. 단, 로그인에는 OAuth 인증과 권한 관리가 필요하고, CMS 설정·데이터 스키마·배포 검증을 새로 해야 합니다. GitHub Pages 자체에는 로그인 API가 없으므로 CMS를 붙이기 전에 OAuth 제공 방식과 계정 권한, 미리보기, 이미지 업로드 경로를 별도 설계해야 합니다. 이 브랜치에서는 보안·권한 설정 없이 관리자 로그인 기능을 임의로 추가하지 않았습니다.
