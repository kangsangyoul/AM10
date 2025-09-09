#!/usr/bin/env python3
import os, subprocess, json, datetime


def run(target: str):
    cmd = ["fio", "--name=bench", f"--directory={target}", "--rw=randrw", "--bs=4k",
           "--size=256M", "--iodepth=32", "--numjobs=2", "--runtime=60", "--time_based=1", "--output-format=json"]
    out = subprocess.check_output(cmd)
    return json.loads(out)


def summarize(j):
    job = j["jobs"][0]
    return {
        "read_iops": job["read"]["iops"],
        "write_iops": job["write"]["iops"],
        "read_lat": job["read"]["clat"]["mean"],
        "write_lat": job["write"]["clat"]["mean"],
    }


def main():
    os.makedirs("/opt/dxt/bench", exist_ok=True)
    fips = os.getenv("DXT_FIPS_MODE") == "1"
    mnt = summarize(run("/secure_mnt"))
    src = summarize(run("/secure_src"))
    ts = datetime.datetime.now().strftime("%Y%m%d-%H%M")
    report = f"/opt/dxt/bench/report-{ts}.html"
    with open(report, "w") as f:
        f.write("<html><head><script src='https://cdn.jsdelivr.net/npm/chart.js'></script></head><body>")
        f.write(f"<h1>Benchmark (FIPS {'ON' if fips else 'OFF'})</h1><table border='1'><tr><th>Target</th><th>Read IOPS</th><th>Write IOPS</th><th>Read Lat</th><th>Write Lat</th></tr>")
        f.write(f"<tr><td>/secure_mnt</td><td>{mnt['read_iops']:.2f}</td><td>{mnt['write_iops']:.2f}</td><td>{mnt['read_lat']:.2f}</td><td>{mnt['write_lat']:.2f}</td></tr>")
        f.write(f"<tr><td>/secure_src</td><td>{src['read_iops']:.2f}</td><td>{src['write_iops']:.2f}</td><td>{src['read_lat']:.2f}</td><td>{src['write_lat']:.2f}</td></tr></table>")
        f.write("<canvas id='chart'></canvas><script>")
        f.write(f"const data={{labels:['/secure_mnt','/secure_src'],datasets:[{{label:'Read IOPS',data:[{mnt['read_iops']},{src['read_iops']}],backgroundColor:'rgba(75,192,192,0.5)'}},{{label:'Write IOPS',data:[{mnt['write_iops']},{src['write_iops']}],backgroundColor:'rgba(192,75,192,0.5)'}}]}};new Chart(document.getElementById('chart'),{{type:'bar',data}});")
        f.write("</script></body></html>")
    print(report)


if __name__ == '__main__':
    main()
