#include <linux/init.h>
#include <linux/module.h>
#include <linux/fs.h>
#include <linux/kprobes.h>

MODULE_LICENSE("GPL");
MODULE_AUTHOR("DXT");
MODULE_DESCRIPTION("dxtenc alpha logger");

static struct kprobe kp_read = {
    .symbol_name = "vfs_read",
};
static struct kprobe kp_write = {
    .symbol_name = "vfs_write",
};

static int handler_pre(struct kprobe *p, struct pt_regs *regs) {
    printk(KERN_INFO "dxtenc: %s called\n", p->symbol_name);
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
