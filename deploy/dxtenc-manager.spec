Name: dxtenc-manager
Version: 0.1.0
Release: 1%{?dist}
Summary: DXT Manager API
License: GPL
BuildArch: noarch
Requires: python3, postgresql-libs, openssl, systemd

%description
FastAPI based manager service.

%prep

%build

%install
mkdir -p %{buildroot}/opt/dxt/manager-api
cp -r ../manager-api/* %{buildroot}/opt/dxt/manager-api/
install -D -m 755 ../deploy/dxtenc-manager.service %{buildroot}/usr/lib/systemd/system/dxtenc-manager.service

%files
/opt/dxt/manager-api
/usr/lib/systemd/system/dxtenc-manager.service
