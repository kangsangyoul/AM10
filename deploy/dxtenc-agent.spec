Name: dxtenc-agent
Version: 0.1.0
Release: 1%{?dist}
Summary: DXT FUSE Agent
License: GPL
BuildArch: noarch
Requires: python3, fuse3, openssl

%description
FUSE-based encryption agent.

%prep

%build

%install
mkdir -p %{buildroot}/opt/dxt/agent-fuse
cp -r ../agent-fuse/* %{buildroot}/opt/dxt/agent-fuse/

%files
/opt/dxt/agent-fuse
