Name: dxtenc-agent
Version: 0.1.0
Release: 1%{?dist}
Summary: DXT FUSE Agent
License: GPL
BuildArch: noarch
Requires: python3, fuse3, openssl, systemd

%description
FUSE-based encryption agent.

%prep

%build

%install
mkdir -p %{buildroot}/opt/dxt/agent-fuse
cp -r ../agent-fuse/* %{buildroot}/opt/dxt/agent-fuse/
install -D -m 755 ../deploy/dxtenc-agent.service %{buildroot}/usr/lib/systemd/system/dxtenc-agent.service
install -D -m 755 ../deploy/dxtenc-cli %{buildroot}/opt/dxt/bin/dxtenc-cli

%files
/opt/dxt/agent-fuse
/opt/dxt/bin/dxtenc-cli
/usr/lib/systemd/system/dxtenc-agent.service
