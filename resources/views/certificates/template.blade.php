<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sertifikat {{ $data['participant_name'] }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        @page {
            size: A4 landscape;
            margin: 0;
        }

        body {
            font-family: 'DejaVu Sans', Arial, sans-serif;
            width: 297mm;
            height: 210mm;
            position: relative;
            overflow: hidden;
            background-image: url("{{ public_path('storage/' . $certificate->design->image_1) }}");
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }

        .certificate-container {
            width: 100%;
            position: relative;
            padding: 14mm;
            margin-top: 8mm;
            margin-left: 66mm;
        }

        .certificate-content {
            width: 100%;
            max-width: 260mm;
            padding: 20px;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .header {
            margin-bottom: 15px;
        }

        .header-top {
            font-size: 42px;
            color: #6b7280;
            text-transform: uppercase;
            font-weight: 500;
        }

        .header-bottom p {
            font-size: 32px;
            margin-bottom: 2px;
        }

        .certificate-title {
            font-size: 130px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: -24px;
        }

        .certificate-subtitle {
            font-size: 72px;
            color: #082854;
            font-weight: 600;
            margin-bottom: 42px;
        }

        .content {
            position: relative;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 32px 0;
        }

        .content-number {
            position: absolute;
            text-align: right;
            top: -28mm;
            right: 65mm;
        }

        .certificate-number-text {
            font-size: 38px;
            color: #082854;
            margin-bottom: 4px;
            font-weight: 600;
        }

        .certificate-number {
            font-size: 38px;
            color: #082854;
        }

        .content-text {
            font-size: 42px;
            color: #082854;
            margin-top: 32px;
            margin-bottom: -32px;
        }

        .participant-name {
            font-size: 115px;
            font-weight: bold;
            color: #082854;
            margin: 52px 0;
            display: inline-block;
            min-width: 250px;
        }

        .program-name {
            color: #082854;
            display: block;
            margin-top: 24px;
            font-size: 72px;
            font-weight: 600;
        }

        .program-description {
            font-size: 42px;
            margin-top: 16px;
        }

        .description {
            font-size: 42px;
            max-width: 1920px;
            margin-top: 24px;
            padding-bottom: 38px;
            border-bottom: 6px dotted #082854;
        }

        .date {
            position: absolute;
            top: 80mm;
            right: 65mm;
            display: flex;
            justify-content: center;
            margin: 32px 0;
            width: 100mm;
            border-top: 2px solid #082854;
            padding-top: 8px;
        }

        .accreditation-label {
            float: left;
            width: 50%;
            font-size: 38px;
            color: #082854;
            margin-right: 16px;
        }

        .accreditation-date {
            float: right;
            width: 50%;
            font-size: 38px;
            color: #082854;
            text-align: right;
        }

        .period {
            font-size: 42px;
            color: #9ca3af;
            margin-top: 24px;
            font-style: italic;
        }

        .footer {
            position: relative;
            margin-left: -57mm;
            margin-top: 200px;
            height: 120px;
            clear: both;
        }

        .signature-container {
            float: left;
            width: 80%;
            text-align: left;
        }

        .period-section {
            float: right;
            width: 30%;
            text-align: left;
            margin-top: 150px;
            margin-right: 600px;
        }

        .qr-container {
            position: absolute;
            top: 48mm;
            left: -51.5mm;
        }

        .qr-code {
            width: 250px;
            height: 250px;
            margin: 32px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            padding: 4px;
            background: white;
            display: block;
        }

        .qr-placeholder {
            width: 120px;
            height: 120px;
            margin: 0 auto 16px auto;
            border: 2px dashed #d1d5db;
            border-radius: 8px;
            background: #f9fafb;
            font-size: 10px;
            display: block;
        }

        .certificate-url {
            font-size: 32px;
            color: #6b7280;
            font-weight: 600;
        }

        .certificate-period {
            font-size: 32px;
            margin-bottom: 2px;
        }

        .signature-space {
            width: 150px;
            height: 250px;
            margin-top: 80px;
            margin-bottom: -50px;
            position: relative;
        }

        .signature-image {
            max-width: 500px;
            max-height: 500px;
            object-fit: contain;
        }

        .signature-name {
            font-size: 42px;
            color: #082854;
            font-weight: bold;
            margin-bottom: 2px;
            text-decoration: underline;
        }

        .signature-title,
        .signature-date {
            font-size: 42px;
        }

        /* Clearfix untuk footer */
        .footer::after {
            content: "";
            display: table;
            clear: both;
        }

        /* Print optimization */
        @media print {
            body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
        }
    </style>
</head>

<body>
    <div class="certificate-container">
        <div class="certificate-content">
            {{-- Header --}}
            <div class="header">
                {{-- @if ($certificate->header_top)
                    <div class="header-top">{{ $certificate->header_top }}</div>
                @endif --}}

                <div class="certificate-title">Certificate</div>
                <div class="certificate-subtitle">
                    @if ($certificate->webinar_id)
                        of Participation
                    @else
                        of Achievement
                    @endif
                </div>
            </div>

            {{-- Content --}}
            <div class="content">
                <div class="content-number">
                    <p class="certificate-number-text">Accreditation Number</p>
                    <p class="certificate-number">
                        {{ sprintf('%04d', $data['certificate_number']) }}/{{ $certificate->certificate_number }}
                    </p>
                </div>

                <div class="content-text">
                    This certificate is proudly presented to
                </div>

                <div class="participant-name">
                    {{ $data['participant_name'] }}
                </div>

                <div class="program-description">
                    as a participant who has successfully completed
                </div>

                <div class="program-name">
                    {{ $certificate->title }}
                </div>

                @if ($certificate->description)
                    <div class="description">
                        {{ $certificate->description }}
                    </div>
                @endif

                <div class="qr-container">
                    @if ($qrCode)
                        <div class="qr-code">
                            @if (str_contains($qrCode, 'image/png'))
                                <img src="{{ $qrCode }}" alt="QR Code"
                                    style="width: 100%; height: 100%; object-fit: contain;">
                            @else
                                {!! $qrCode !!}
                            @endif
                        </div>
                    @else
                        <div class="qr-placeholder">
                            QR Code<br>Not Available
                        </div>
                    @endif

                    {{-- @if ($certificateUrl)
                        <div class="certificate-url">{{ $certificateUrl }}</div>
                    @else
                        <div class="certificate-url">
                            https://kompeten.id/certificate/{{ $data['certificate_code'] }}
                        </div>
                    @endif --}}
                </div>

                <div class="date">
                    <p class="accreditation-label">Accreditation Date</p>
                    <p class="accreditation-date">
                        {{ \Carbon\Carbon::parse($data['participant_issued_at'])->locale('id')->translatedFormat('d F Y') }}
                    </p>
                </div>
            </div>
            {{-- Footer --}}
            <div class="footer">
                <div class="signature-container">
                    <div class="signature-space">
                        @if ($certificate->sign && $certificate->sign->image)
                            <img src="{{ public_path('storage/' . $certificate->sign->image) }}" alt="Tanda Tangan"
                                class="signature-image">
                        @else
                            <div style="color: #9ca3af; font-style: italic; font-size: 10px;">Tanda Tangan</div>
                        @endif
                    </div>

                    @if ($certificate->sign)
                        <div class="signature-name">{{ $certificate->sign->name }}</div>
                        <div class="signature-title">
                            {{ $certificate->sign->position ?? 'Direktur Kompeten' }}
                        </div>
                    @else
                        <div class="signature-name">Direktur</div>
                        <div class="signature-title">Kompeten</div>
                    @endif
                </div>

                <div class="period-section">
                    <div class="header-bottom">
                        <p>Kompeten IDN</p>
                        <p>Alamat : {{ $certificate->header_bottom }}</p>
                        <p>Whatspp: +62 895-2851-4480</p>
                        <p>Email: kompetenidn@gmail.com</p>
                    </div>

                    {{-- <div class="certificate-period">{{ $certificate->period }}</div> --}}
                </div>
            </div>
        </div>
    </div>
</body>

</html>
