#include <linux/init.h>
#include <linux/module.h>
#include <linux/fs.h>
#include <linux/kprobes.h>
#include <linux/dcache.h>
#include <linux/path.h>
#include <linux/limits.h>
#include <linux/uaccess.h>
#include <linux/cred.h>
#include <linux/string.h>

MODULE_LICENSE("GPL");
MODULE_AUTHOR("DXT");
MODULE_DESCRIPTION("dxtenc alpha logger");

static char *policy_path = "/secure_src";
module_param(policy_path, charp, 0644);
MODULE_PARM_DESC(policy_path, "Path to monitor");

static struct kprobe kp_read = {
    .symbol_name = "vfs_read",
};
static struct kprobe kp_write = {
    .symbol_name = "vfs_write",
};

static int handler_pre(struct kprobe *p, struct pt_regs *regs) {
    struct file *file = (struct file *)regs->di;
    char buf[PATH_MAX];
    char *path = d_path(&file->f_path, buf, PATH_MAX);
    if (!IS_ERR(path) && strncmp(path, policy_path, strlen(policy_path)) == 0) {
        const char *op = strcmp(p->symbol_name, "vfs_read") == 0 ? "read" : "write";
        printk(KERN_INFO "dxtenc: op=%s path=%s pid=%d uid=%u\n", op, path, current->pid, __kuid_val(current_uid()));
    }
    return 0;
}

static int __init dxtenc_init(void){
    kp_read.pre_handler = handler_pre;
    kp_write.pre_handler = handler_pre;
    register_kprobe(&kp_read);
    register_kprobe(&kp_write);
    printk(KERN_INFO "dxtenc loaded (alpha logger)\n");
    return 0;
}

static void __exit dxtenc_exit(void){
    unregister_kprobe(&kp_read);
    unregister_kprobe(&kp_write);
    printk(KERN_INFO "dxtenc unloaded\n");
}

module_init(dxtenc_init);
module_exit(dxtenc_exit);
