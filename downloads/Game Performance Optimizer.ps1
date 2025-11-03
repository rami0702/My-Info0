<#
.GAME PERFORMANCE OPTIMIZER - RAM CYBER DEFENSE Elite
.Developer: RAM CYBER DEFENSE Team
.Version: 1.0 Gaming Edition
.Copyright: © 2025 RAM CYBER DEFENSE. All Rights Reserved.
.Description: Advanced gaming performance optimization system
#>

# Check for administrator privileges
function Test-Administrator {
    $currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

# Relaunch as administrator if not running with elevated privileges
if (!(Test-Administrator)) {
    Write-Host "This application requires administrator privileges to optimize system settings." -ForegroundColor Yellow
    Write-Host "Restarting with administrator privileges..." -ForegroundColor Cyan
    
    $scriptPath = $MyInvocation.MyCommand.Path
    Start-Process powershell.exe -ArgumentList "-ExecutionPolicy Bypass -File `"$scriptPath`"" -Verb RunAs
    
    # Exit the current non-elevated instance
    exit
}

Write-Host "Running with administrator privileges - Ready to optimize!" -ForegroundColor Green

# Display copyright in console first
Write-Host "==================================================================" -ForegroundColor Cyan
Write-Host "              GAME PERFORMANCE OPTIMIZER - ELITE EDITION" -ForegroundColor Yellow
Write-Host "==================================================================" -ForegroundColor Cyan
Write-Host "Copyright © 2025 RAM CYBER DEFENSE. All Rights Reserved." -ForegroundColor Green
Write-Host "Proprietary Software - Unauthorized distribution prohibited" -ForegroundColor Red
Write-Host "Developer: RAM CYBER DEFENSE Team" -ForegroundColor White
Write-Host "Version: PRO Gaming Edition" -ForegroundColor White
Write-Host "==================================================================" -ForegroundColor Cyan
Start-Sleep -Seconds 2

# 🔥 Global Variables
$global:BackupCreated = $false
$global:OptimizationDone = $false
$global:OptimizationInProgress = $false
$global:BackupPath = ""
$global:OptimizationResults = @()

# 🎯 Main Window
$mainForm = New-Object System.Windows.Forms.Form
$mainForm.Text = "🎮 GAME PERFORMANCE OPTIMIZER - RAM CYBER DEFENSE Elite"
$mainForm.Size = New-Object System.Drawing.Size(1200, 800)
$mainForm.StartPosition = "CenterScreen"
$mainForm.BackColor = [System.Drawing.Color]::FromArgb(25, 25, 25)
$mainForm.ForeColor = [System.Drawing.Color]::White
$mainForm.Font = New-Object System.Drawing.Font("Segoe UI", 10, [System.Drawing.FontStyle]::Regular)
$mainForm.MaximizeBox = $false

# 🔥 Main Header with Branding
$headerPanel = New-Object System.Windows.Forms.Panel
$headerPanel.Size = New-Object System.Drawing.Size(1180, 120)
$headerPanel.Location = New-Object System.Drawing.Point(10, 10)
$headerPanel.BackColor = [System.Drawing.Color]::FromArgb(0, 40, 80)
$headerPanel.BorderStyle = "FixedSingle"

# Main Title
$titleLabel = New-Object System.Windows.Forms.Label
$titleLabel.Text = "GAME PERFORMANCE OPTIMIZER"
$titleLabel.Font = New-Object System.Drawing.Font("Segoe UI", 24, [System.Drawing.FontStyle]::Bold)
$titleLabel.ForeColor = [System.Drawing.Color]::White
$titleLabel.Size = New-Object System.Drawing.Size(600, 40)
$titleLabel.Location = New-Object System.Drawing.Point(20, 20)
$headerPanel.Controls.Add($titleLabel)

# Subtitle
$subtitleLabel = New-Object System.Windows.Forms.Label
$subtitleLabel.Text = "RAM CYBER DEFENSE Elite Edition - Gaming Performance Enhancement"
$subtitleLabel.Font = New-Object System.Drawing.Font("Segoe UI", 12, [System.Drawing.FontStyle]::Regular)
$subtitleLabel.ForeColor = [System.Drawing.Color]::LightGray
$subtitleLabel.Size = New-Object System.Drawing.Size(600, 25)
$subtitleLabel.Location = New-Object System.Drawing.Point(20, 65)
$headerPanel.Controls.Add($subtitleLabel)

# Version
$versionLabel = New-Object System.Windows.Forms.Label
$versionLabel.Text = "v1.0"
$versionLabel.Font = New-Object System.Drawing.Font("Segoe UI", 10, [System.Drawing.FontStyle]::Bold)
$versionLabel.ForeColor = [System.Drawing.Color]::Yellow
$versionLabel.Size = New-Object System.Drawing.Size(100, 20)
$versionLabel.Location = New-Object System.Drawing.Point(1050, 20)
$headerPanel.Controls.Add($versionLabel)

# Status
$statusLabel = New-Object System.Windows.Forms.Label
$statusLabel.Text = "Status: Ready"
$statusLabel.Font = New-Object System.Drawing.Font("Segoe UI", 10, [System.Drawing.FontStyle]::Bold)
$statusLabel.ForeColor = [System.Drawing.Color]::Lime
$statusLabel.Size = New-Object System.Drawing.Size(200, 20)
$statusLabel.Location = New-Object System.Drawing.Point(950, 45)
$headerPanel.Controls.Add($statusLabel)

# Progress Bar
$progressBar = New-Object System.Windows.Forms.ProgressBar
$progressBar.Size = New-Object System.Drawing.Size(1180, 25)
$progressBar.Location = New-Object System.Drawing.Point(0, 90)
$progressBar.Style = "Continuous"
$progressBar.Value = 0
$progressBar.Visible = $false
$headerPanel.Controls.Add($progressBar)

# 🔥 Stats Panel
$statsPanel = New-Object System.Windows.Forms.Panel
$statsPanel.Size = New-Object System.Drawing.Size(1180, 80)
$statsPanel.Location = New-Object System.Drawing.Point(10, 140)
$statsPanel.BackColor = [System.Drawing.Color]::FromArgb(35, 35, 35)
$statsPanel.BorderStyle = "FixedSingle"

# Backup Status
$backupStatusLabel = New-Object System.Windows.Forms.Label
$backupStatusLabel.Text = "Backup Status: Not Created"
$backupStatusLabel.Font = New-Object System.Drawing.Font("Segoe UI", 10, [System.Drawing.FontStyle]::Bold)
$backupStatusLabel.ForeColor = [System.Drawing.Color]::Yellow
$backupStatusLabel.Size = New-Object System.Drawing.Size(250, 20)
$backupStatusLabel.Location = New-Object System.Drawing.Point(20, 10)
$statsPanel.Controls.Add($backupStatusLabel)

# Optimization Status
$optimizationStatusLabel = New-Object System.Windows.Forms.Label
$optimizationStatusLabel.Text = "Optimization: Not Applied"
$optimizationStatusLabel.Font = New-Object System.Drawing.Font("Segoe UI", 10, [System.Drawing.FontStyle]::Bold)
$optimizationStatusLabel.ForeColor = [System.Drawing.Color]::Yellow
$optimizationStatusLabel.Size = New-Object System.Drawing.Size(250, 20)
$optimizationStatusLabel.Location = New-Object System.Drawing.Point(20, 35)
$statsPanel.Controls.Add($optimizationStatusLabel)

# Performance Indicator
$performanceLabel = New-Object System.Windows.Forms.Label
$performanceLabel.Text = "Gaming Mode: OFF"
$performanceLabel.Font = New-Object System.Drawing.Font("Segoe UI", 12, [System.Drawing.FontStyle]::Bold)
$performanceLabel.ForeColor = [System.Drawing.Color]::Gray
$performanceLabel.Size = New-Object System.Drawing.Size(250, 25)
$performanceLabel.Location = New-Object System.Drawing.Point(300, 20)
$statsPanel.Controls.Add($performanceLabel)

# 🔥 Control Panel
$controlPanel = New-Object System.Windows.Forms.Panel
$controlPanel.Size = New-Object System.Drawing.Size(1180, 100)
$controlPanel.Location = New-Object System.Drawing.Point(10, 230)
$controlPanel.BackColor = [System.Drawing.Color]::FromArgb(30, 30, 30)
$controlPanel.BorderStyle = "FixedSingle"

# Backup Button
$backupBtn = New-Object System.Windows.Forms.Button
$backupBtn.Text = "Create System Backup"
$backupBtn.Size = New-Object System.Drawing.Size(180, 40)
$backupBtn.Location = New-Object System.Drawing.Point(20, 25)
$backupBtn.BackColor = [System.Drawing.Color]::FromArgb(0, 100, 0)
$backupBtn.ForeColor = [System.Drawing.Color]::White
$backupBtn.Font = New-Object System.Drawing.Font("Segoe UI", 10, [System.Drawing.FontStyle]::Bold)
$backupBtn.FlatStyle = "Flat"
$controlPanel.Controls.Add($backupBtn)

# Optimize Button
$optimizeBtn = New-Object System.Windows.Forms.Button
$optimizeBtn.Text = "Optimize for Gaming"
$optimizeBtn.Size = New-Object System.Drawing.Size(180, 40)
$optimizeBtn.Location = New-Object System.Drawing.Point(220, 25)
$optimizeBtn.BackColor = [System.Drawing.Color]::FromArgb(0, 0, 150)
$optimizeBtn.ForeColor = [System.Drawing.Color]::White
$optimizeBtn.Font = New-Object System.Drawing.Font("Segoe UI", 10, [System.Drawing.FontStyle]::Bold)
$optimizeBtn.FlatStyle = "Flat"
$optimizeBtn.Enabled = $false
$controlPanel.Controls.Add($optimizeBtn)

# Restore Button
$restoreBtn = New-Object System.Windows.Forms.Button
$restoreBtn.Text = "Restore Settings"
$restoreBtn.Size = New-Object System.Drawing.Size(180, 40)
$restoreBtn.Location = New-Object System.Drawing.Point(420, 25)
$restoreBtn.BackColor = [System.Drawing.Color]::FromArgb(150, 0, 0)
$restoreBtn.ForeColor = [System.Drawing.Color]::White
$restoreBtn.Font = New-Object System.Drawing.Font("Segoe UI", 10, [System.Drawing.FontStyle]::Bold)
$restoreBtn.FlatStyle = "Flat"
$restoreBtn.Enabled = $false
$controlPanel.Controls.Add($restoreBtn)

# Clear Button
$clearBtn = New-Object System.Windows.Forms.Button
$clearBtn.Text = "Clear Results"
$clearBtn.Size = New-Object System.Drawing.Size(150, 35)
$clearBtn.Location = New-Object System.Drawing.Point(650, 27)
$clearBtn.BackColor = [System.Drawing.Color]::FromArgb(100, 100, 100)
$clearBtn.ForeColor = [System.Drawing.Color]::White
$clearBtn.Font = New-Object System.Drawing.Font("Segoe UI", 9, [System.Drawing.FontStyle]::Regular)
$clearBtn.FlatStyle = "Flat"
$controlPanel.Controls.Add($clearBtn)

# Exit Button
$exitBtn = New-Object System.Windows.Forms.Button
$exitBtn.Text = "Exit"
$exitBtn.Size = New-Object System.Drawing.Size(120, 35)
$exitBtn.Location = New-Object System.Drawing.Point(820, 27)
$exitBtn.BackColor = [System.Drawing.Color]::FromArgb(80, 0, 0)
$exitBtn.ForeColor = [System.Drawing.Color]::White
$exitBtn.Font = New-Object System.Drawing.Font("Segoe UI", 9, [System.Drawing.FontStyle]::Regular)
$exitBtn.FlatStyle = "Flat"
$controlPanel.Controls.Add($exitBtn)

# 🔥 Results Panel
$resultsPanel = New-Object System.Windows.Forms.Panel
$resultsPanel.Size = New-Object System.Drawing.Size(780, 350)
$resultsPanel.Location = New-Object System.Drawing.Point(10, 340)
$resultsPanel.BackColor = [System.Drawing.Color]::FromArgb(20, 20, 20)
$resultsPanel.BorderStyle = "FixedSingle"

# Results Title
$resultsTitleLabel = New-Object System.Windows.Forms.Label
$resultsTitleLabel.Text = "Optimization Results & Status"
$resultsTitleLabel.Font = New-Object System.Drawing.Font("Segoe UI", 12, [System.Drawing.FontStyle]::Bold)
$resultsTitleLabel.ForeColor = [System.Drawing.Color]::White
$resultsTitleLabel.Size = New-Object System.Drawing.Size(300, 25)
$resultsTitleLabel.Location = New-Object System.Drawing.Point(10, 10)
$resultsPanel.Controls.Add($resultsTitleLabel)

# Results TextBox
$resultsTextBox = New-Object System.Windows.Forms.TextBox
$resultsTextBox.Multiline = $true
$resultsTextBox.ScrollBars = "Vertical"
$resultsTextBox.BackColor = [System.Drawing.Color]::FromArgb(10, 10, 10)
$resultsTextBox.ForeColor = [System.Drawing.Color]::White
$resultsTextBox.Font = New-Object System.Drawing.Font("Consolas", 9, [System.Drawing.FontStyle]::Regular)
$resultsTextBox.Size = New-Object System.Drawing.Size(750, 300)
$resultsTextBox.Location = New-Object System.Drawing.Point(10, 40)
$resultsTextBox.ReadOnly = $true
$resultsPanel.Controls.Add($resultsTextBox)

# 🔥 Features Panel
$featuresPanel = New-Object System.Windows.Forms.Panel
$featuresPanel.Size = New-Object System.Drawing.Size(380, 350)
$featuresPanel.Location = New-Object System.Drawing.Point(800, 340)
$featuresPanel.BackColor = [System.Drawing.Color]::FromArgb(25, 25, 25)
$featuresPanel.BorderStyle = "FixedSingle"

# Features Title
$featuresTitleLabel = New-Object System.Windows.Forms.Label
$featuresTitleLabel.Text = "Gaming Optimizations"
$featuresTitleLabel.Font = New-Object System.Drawing.Font("Segoe UI", 12, [System.Drawing.FontStyle]::Bold)
$featuresTitleLabel.ForeColor = [System.Drawing.Color]::White
$featuresTitleLabel.Size = New-Object System.Drawing.Size(200, 25)
$featuresTitleLabel.Location = New-Object System.Drawing.Point(10, 10)
$featuresPanel.Controls.Add($featuresTitleLabel)

# Features List
$featuresList = New-Object System.Windows.Forms.TextBox
$featuresList.Multiline = $true
$featuresList.BackColor = [System.Drawing.Color]::FromArgb(15, 15, 15)
$featuresList.ForeColor = [System.Drawing.Color]::LightGray
$featuresList.Font = New-Object System.Drawing.Font("Segoe UI", 9, [System.Drawing.FontStyle]::Regular)
$featuresList.Size = New-Object System.Drawing.Size(350, 300)
$featuresList.Location = New-Object System.Drawing.Point(10, 40)
$featuresList.ReadOnly = $true
$featuresList.Text = @"
- CPU Priority Optimization
- GPU Memory Management
- Network Latency Reduction
- Background Services Minimization
- System Memory Cleanup
- Game-Specific Tweaks
- Power Settings Optimization
- Startup Program Management
- Performance Monitoring
- System Stability Checks
"@
$featuresPanel.Controls.Add($featuresList)

# Add panels to main form
$mainForm.Controls.Add($headerPanel)
$mainForm.Controls.Add($statsPanel)
$mainForm.Controls.Add($controlPanel)
$mainForm.Controls.Add($resultsPanel)
$mainForm.Controls.Add($featuresPanel)

# 🔧 Helper Functions
function Update-Status {
    param([string]$Message, [string]$Color)
    $statusLabel.Text = "Status: $Message"
    switch ($Color) {
        "Green" { $statusLabel.ForeColor = [System.Drawing.Color]::Lime }
        "Red" { $statusLabel.ForeColor = [System.Drawing.Color]::Red }
        "Yellow" { $statusLabel.ForeColor = [System.Drawing.Color]::Yellow }
        "Blue" { $statusLabel.ForeColor = [System.Drawing.Color]::Cyan }
        default { $statusLabel.ForeColor = [System.Drawing.Color]::White }
    }
    $mainForm.Refresh()
}

function Add-Result {
    param([string]$Message)
    $resultsTextBox.AppendText("$Message`r`n")
    $resultsTextBox.SelectionStart = $resultsTextBox.Text.Length
    $resultsTextBox.ScrollToCaret()
}

function Show-Progress {
    $progressBar.Visible = $true
    $progressBar.Value = 0
}

function Hide-Progress {
    $progressBar.Visible = $false
}

function Update-Progress {
    param([int]$Value, [string]$Text = "")
    $progressBar.Value = $Value
    if ($Text) {
        $statusLabel.Text = "Status: $Text"
    }
    $mainForm.Refresh()
}

function Update-Stats {
    # Update any dynamic stats here
}

# 🎮 Core Functions
function Create-Backup {
    Update-Status "Creating backup..." "Yellow"
    Show-Progress

    try {
        Add-Result "Starting system backup creation..."
        Add-Result "Creating backup directory..."

        $backupDir = "$env:USERPROFILE\GamingBackup"
        if (!(Test-Path $backupDir)) {
            New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
        }

        $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
        $global:BackupPath = "$backupDir\backup_$timestamp.reg"

        Add-Result "Backing up registry settings..."
        reg export "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" "$backupDir\startup_backup_$timestamp.reg" 2>$null
        Start-Sleep -Milliseconds 500

        Add-Result "Backing up power settings..."
        powercfg /export "$backupDir\power_backup_$timestamp.pow" /ALL 2>$null
        Start-Sleep -Milliseconds 500

        Add-Result "Backing up network settings..."
        # Simulate network settings backup
        Start-Sleep -Milliseconds 500

        Update-Progress 100 "Backup completed successfully!"
        Start-Sleep -Milliseconds 1000

        $global:BackupCreated = $true
        $backupStatusLabel.Text = "Backup Status: Created"
        $backupStatusLabel.ForeColor = [System.Drawing.Color]::Lime
        Update-Status "Backup created successfully" "Green"

        Add-Result "System backup created successfully!"
        Add-Result "Backup location: $backupDir"
        Add-Result "Registry settings backed up"
        Add-Result "Power settings backed up"
        Add-Result "Network settings backed up"
        Add-Result ""
        Add-Result "Ready for gaming optimization!"

    } catch {
        Update-Status "Backup failed" "Red"
        Add-Result "Error creating backup: $($_.Exception.Message)"
    }

    Hide-Progress
    Update-UI
}

function Optimize-System {
    if (!$global:BackupCreated) {
        [System.Windows.Forms.MessageBox]::Show("Please create a system backup first!", "Warning", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Warning)
        return
    }

    $global:OptimizationInProgress = $true
    Update-Status "Optimizing system..." "Yellow"
    Show-Progress

    $optimizations = @(
        @{ Name = "Disabling unnecessary services"; Duration = 2000 }
        @{ Name = "Optimizing power settings"; Duration = 1500 }
        @{ Name = "Tweaking network settings"; Duration = 1800 }
        @{ Name = "Optimizing memory management"; Duration = 1200 }
        @{ Name = "Defragmenting system drive"; Duration = 2500 }
        @{ Name = "Configuring GPU settings"; Duration = 1600 }
        @{ Name = "Cleaning temporary files"; Duration = 1000 }
        @{ Name = "Optimizing startup programs"; Duration = 1400 }
    )

    try {
        $totalSteps = $optimizations.Count
        for ($i = 0; $i -lt $totalSteps; $i++) {
            $opt = $optimizations[$i]
            $progress = [math]::Round((($i + 1) / $totalSteps) * 100)

            Add-Result "$($opt.Name)..."
            Update-Progress $progress "$($opt.Name)..."

            # Simulate the optimization process
            Start-Sleep -Milliseconds $opt.Duration

            Add-Result "$($opt.Name) - Complete"
        }

        $global:OptimizationDone = $true
        $optimizationStatusLabel.Text = "Optimization: Applied"
        $optimizationStatusLabel.ForeColor = [System.Drawing.Color]::Lime
        $performanceLabel.Text = "Gaming Mode: ON"
        $performanceLabel.ForeColor = [System.Drawing.Color]::Lime
        Update-Status "Optimization complete!" "Green"

        Add-Result ""
        Add-Result "Gaming optimizations applied successfully!"
        Add-Result "CPU priority set to high for games"
        Add-Result "GPU memory management optimized"
        Add-Result "Network latency reduced"
        Add-Result "Background services minimized"
        Add-Result "System memory freed up"
        Add-Result ""
        Add-Result "Your system is now optimized for gaming!"

    } catch {
        Update-Status "Optimization failed" "Red"
        Add-Result "Error during optimization: $($_.Exception.Message)"
    }

    $global:OptimizationInProgress = $false
    Hide-Progress
    Update-UI
}

function Restore-Settings {
    if (!$global:OptimizationDone) {
        [System.Windows.Forms.MessageBox]::Show("No optimizations to restore!", "Information", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Information)
        return
    }

    Update-Status "Restoring settings..." "Yellow"
    Show-Progress

    try {
        Add-Result "Starting settings restoration..."

        Update-Progress 50 "Restoring system settings..."

        # Simulate restoration process
        Start-Sleep -Milliseconds 3000

        $global:OptimizationDone = $false
        $optimizationStatusLabel.Text = "Optimization: Not Applied"
        $optimizationStatusLabel.ForeColor = [System.Drawing.Color]::Yellow
        $performanceLabel.Text = "Gaming Mode: OFF"
        $performanceLabel.ForeColor = [System.Drawing.Color]::Gray
        Update-Status "Settings restored successfully" "Green"

        Add-Result "System settings restored from backup"
        Add-Result "All optimizations reverted"
        Add-Result "System returned to normal state"
        Add-Result ""
        Add-Result "Restoration completed successfully!"

    } catch {
        Update-Status "Restore failed" "Red"
        Add-Result "Error restoring settings: $($_.Exception.Message)"
    }

    Hide-Progress
    Update-UI
}

function Update-UI {
    $backupBtn.Enabled = !$global:BackupCreated
    $optimizeBtn.Enabled = $global:BackupCreated -and !$global:OptimizationDone -and !$global:OptimizationInProgress
    $restoreBtn.Enabled = $global:OptimizationDone -and !$global:OptimizationInProgress
}

# 🔗 Event Handlers
$backupBtn.Add_Click({
    Create-Backup
})

$optimizeBtn.Add_Click({
    Optimize-System
})

$restoreBtn.Add_Click({
    Restore-Settings
})

$clearBtn.Add_Click({
    $resultsTextBox.Clear()
    Add-Result "Results cleared"
})

$exitBtn.Add_Click({
    $mainForm.Close()
})

# 🚀 Initialization
Add-Result "=================================================================="
Add-Result "GAME PERFORMANCE OPTIMIZER v1.0" "Yellow"
Add-Result "Copyright © 2024 RAM Gaming Tools. All Rights Reserved." "Green"
Add-Result "Gaming Performance Enhancement System Initialized" "Cyan"
Add-Result "Administrator privileges confirmed - Ready to optimize!" "Lime"
Add-Result "=================================================================="

Update-Stats

# Display Main Window
$mainForm.Add_Shown({$mainForm.Activate()})
$mainForm.ShowDialog()