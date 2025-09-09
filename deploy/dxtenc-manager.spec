Name: dxtenc-manager
Version: 0.1.0
Release: 1%{?dist}
Summary: DXT Manager API
License: GPL
BuildArch: noarch
Requires: python3, postgresql-libs, openssl

%description
FastAPI based manager service.

%prep

%build

%install
mkdir -p %{buildroot}/opt/dxt/manager-api
cp -r ../manager-api/* %{buildroot}/opt/dxt/manager-api/

%files
/opt/dxt/manager-api
