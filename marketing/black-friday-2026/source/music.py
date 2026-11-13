import numpy as np, wave, sys
SR=48000; D=25.0; N=int(SR*D); t=np.arange(N)/SR
rng=np.random.default_rng(3)
def hz(m): return 440*2**((m-69)/12)
L=np.zeros(N); Rr=np.zeros(N)
def add(sig,start,pan=0.0,gain=1.0):
    i=int(start*SR); j=min(N,i+len(sig)); s=sig[:j-i]*gain
    L[i:j]+=s*np.cos((pan+1)*np.pi/4); Rr[i:j]+=s*np.sin((pan+1)*np.pi/4)
def env_adsr(n,a,r):
    e=np.ones(n); na=int(a*SR); nr=int(r*SR)
    e[:na]=np.sin(np.linspace(0,np.pi/2,na))**2
    e[-nr:]*=np.cos(np.linspace(0,np.pi/2,nr))**2; return e
def pad(notes,start,dur,g=.05):
    n=int(dur*SR); tt=np.arange(n)/SR; out=np.zeros(n)
    for m in notes:
        f=hz(m)
        for det in (-0.07,0.0,0.06):
            ff=f*2**(det/12)
            out+=np.sin(2*np.pi*ff*tt+rng.uniform(0,6))+.25*np.sin(2*np.pi*2*ff*tt)+.08*np.sin(2*np.pi*3*ff*tt)
    out*=env_adsr(n,min(1.6,dur*.4),min(1.8,dur*.45))*(1+.15*np.sin(2*np.pi*.25*tt))
    return out*g/len(notes)
def piano(m,dur=2.5,g=.12):
    n=int(dur*SR); tt=np.arange(n)/SR; f=hz(m)
    s=sum(a*np.sin(2*np.pi*f*k*tt)*np.exp(-tt*(1.8+k*1.4)) for k,a in [(1,1),(2,.42),(3,.18),(4,.08),(5,.03)])
    s*=np.minimum(1,tt/0.006); return s*g
def bell(m,dur=4,g=.06):
    n=int(dur*SR); tt=np.arange(n)/SR; f=hz(m)
    s=sum(a*np.sin(2*np.pi*f*k*tt)*np.exp(-tt*d) for k,a,d in [(1,1,.9),(2.76,.35,1.6),(5.4,.15,2.6),(8.93,.06,3.5)])
    return s*np.minimum(1,tt/0.003)*g
def sub(start,g=.35):
    n=int(3*SR); tt=np.arange(n)/SR; f=42*np.exp(-tt*.6)+30
    s=np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt*1.3)*np.minimum(1,tt/0.02)
    add(s,start,0,g)
def riser(end,dur=1.6,g=.05):
    n=int(dur*SR); nz=rng.standard_normal(n)
    # crude bandpass via moving-average difference, rising
    k=np.linspace(0,1,n)**2
    sm=np.convolve(nz,np.ones(40)/40,'same'); s=(nz-sm)*k*0.5+sm*k
    add(s,end-dur,-.3,g); add(s[::-1]*0+np.roll(s,300),end-dur,.3,g)
# chord plan (MIDI): Fmaj9, Am7, Dm9, Bbmaj7(#11), Fmaj9/C, Gm9->C sus, Fmaj9
chords=[(0,4.2,[41,53,57,60,64,67]),(4,3.2,[45,57,60,64,67]),(7,3.2,[38,50,53,57,60,64]),
        (10,4.2,[46,58,62,65,69]),(14,4.2,[48,57,60,64,67]),(18,7.0,[41,53,57,60,64,67,72])]
for st,du,notes in chords:
    add(pad(notes[1:],st,du+1.4),st,0,1.0)
    add(pad([notes[0],notes[0]-12],st,du+1.4,.06),st,0,1.0)
# piano arpeggios (gentle, sparse)
arp={0:[65,69,72,76],4:[69,72,76,79],7:[62,65,69,72],10:[70,74,77,81],14:[72,76,79,84],18:[65,69,72,77]}
for st,du,notes in chords:
    seq=arp[st]; step=0.75 if st in(4,7,10,14) else 1.0
    k=0; x=st+0.25
    while x<st+du-0.3 and x<23.2:
        add(piano(seq[k%len(seq)]),x,(-.4 if k%2 else .4),.9 if k%4==0 else .65); k+=1; x+=step
# accents
add(bell(84),0.45,0,.8); add(bell(79),1.4,.3,.5)
sub(4.0,.25); riser(4.0,1.2,.03)
riser(10.4,1.8,.045); sub(10.4,.42); add(bell(81),10.45,-.2,.9); add(bell(88),10.9,.3,.5)
add(bell(77),13.0,.2,.4)
riser(18.0,1.3,.03); sub(18.0,.3); add(bell(84),18.1,0,.8); add(bell(89),19.5,-.3,.45); add(bell(84),21.2,.3,.4)
# reverb
ir_n=int(3.2*SR); it=np.arange(ir_n)/SR
def ir(seed):
    r=np.random.default_rng(seed).standard_normal(ir_n)*np.exp(-it*2.1)
    r=np.convolve(r,np.ones(8)/8,'same'); r[:int(.02*SR)]*=np.linspace(0,1,int(.02*SR)); return r/np.sqrt((r**2).sum())
def conv(x,h):
    n=len(x)+len(h); F=1<<(n-1).bit_length()
    return np.fft.irfft(np.fft.rfft(x,F)*np.fft.rfft(h,F),F)[:len(x)]
wl=conv(L,ir(11)); wr=conv(Rr,ir(12))
outL=L*.75+wl*.55; outR=Rr*.75+wr*.55
# gentle lowpass (one-pole) for warmth
def lp(x,fc):
    a=np.exp(-2*np.pi*fc/SR); y=np.empty_like(x); s=0.0
    # vectorized via lfilter-like loop in chunks
    from itertools import accumulate
    y=np.array(list(accumulate(x,lambda p,v:a*p+(1-a)*v)))
    return y
outL=lp(outL,7000); outR=lp(outR,7000)
fade=np.ones(N); fi=int(.4*SR); fo=int(1.6*SR)
fade[:fi]=np.linspace(0,1,fi); fade[-fo:]=np.cos(np.linspace(0,np.pi/2,fo))**2
outL*=fade; outR*=fade
pk=max(abs(outL).max(),abs(outR).max()); g=10**(-3/20)/pk
st=np.stack([outL*g,outR*g],1)
st=np.tanh(st*1.1)/np.tanh(1.1)
pcm=(st*32767).astype('<i2')
w=wave.open(sys.argv[1],'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes()); w.close()
print('ok')
