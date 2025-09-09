Name: dxtenc-bench
Version: 0.1.0
Release: 1%{?dist}
Summary: DXT benchmark tools
License: GPL
BuildArch: noarch
Requires: python3, fio, systemd

%description
Benchmark wrapper and HTML report generator.

%prep

%build

%install
mkdir -p %{buildroot}/opt/dxt/bench
cp -r ../bench/* %{buildroot}/opt/dxt/bench/

%files
/opt/dxt/bench
